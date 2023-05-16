import { load as cheerioLoad } from "cheerio";
import acorn from "acorn"
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({url, params}) => {
  // some constants
  console.log(url)

  const theirUrl: string = params.to;
  const dmc = theirUrl.indexOf("/", 8);
  const domain = dmc == -1 ? theirUrl : theirUrl.substring(0, dmc);
  const relativeUrl = dmc == -1 ? "" : theirUrl.substring(8 + domain.length);
  const ourUrl = url.origin + "/escape/";
  
  // get the requested content
  try {
    const res = await fetch(theirUrl);
    let data: any;
    const reqType = res.headers.get('content-type');
    console.log(reqType)

    //javascript parse and replace with acorn
    if(reqType && reqType.includes("javascript")) {
      data = await res.text();
      if(typeof data != "string") {
        return new Response("No.", {status: 500})
      }
      let nodes = acorn.parse(data, {ecmaVersion: 2020});
      
    }

    //css parse and replace with our own urls
    if(reqType && reqType.includes("css")) {
      data = await res.text();
      if(typeof data != "string") {
        return new Response("No.", {status: 500})
      }
      data = data.replace(/url\((.*?)\)/g, (match, p1) => {
        return `url(${convertUrl(p1)})`
      })

      return new Response(data, { headers: { 'content-type': reqType } });
    }

    // send the request content back if not html
    if (reqType && !reqType.startsWith("text/html")) {
      data = await res.blob();
      return new Response(data, { headers: { 'content-type': reqType } });
    }


    data = await res.text();

    //html time baby
    const $ = cheerioLoad(data);
    
    $('*').each((i, element) => {
      const urlAttributes = ['href', 'src', 'action', 'cite', 'data', 'formaction', 'icon', 'longdesc', 'manifest', 'poster', 'usemap'];
      
      for (const attr of urlAttributes) {
        const oldUrl = $(element).attr(attr);
        if (oldUrl) {
          $(element).attr(attr, convertUrl(oldUrl));
        }
      }

      // replace inline styles
    const oldStyle = $(element).attr('style');
    if (oldStyle) {
      const newStyle = oldStyle.replace(/url\((.*?)\)/g, (match, p1) => {
        return `url(${convertUrl(p1)})`
      })
      $(element).attr('style', newStyle);
      }

    });

    //replace style tags
    $('style').each((i, element) => {
      const oldStyle = $(element).html();
      if (oldStyle) {
        const newStyle = oldStyle.replace(/url\((.*?)\)/g, (match, p1) => {
          return `url(${convertUrl(p1)})`
        })
        $(element).html(newStyle);
      }
    });


    
    return new Response($.html(), { headers: { 'content-type': 'text/html' } });

    
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }


  //TODO: make this better
  function convertUrl(oldUrl: string) {
    if (oldUrl.startsWith(ourUrl)) {
      return oldUrl;
    } else if (oldUrl.startsWith("/")) {
      return ourUrl + domain + oldUrl;
    } else if (oldUrl.startsWith(".")) {
      return ourUrl + domain + relativeUrl + oldUrl.substring(1);
    } else {
      return ourUrl + oldUrl;
    }
  }
};