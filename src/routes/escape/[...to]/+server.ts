import { load as cheerioLoad } from "cheerio";
import acorn from "acorn"
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({url, params}) => {2
  // some constants
  const theirUrl: string = params.to;
  const dmc = theirUrl.indexOf("/", 8);
  const domain = dmc == -1 ? theirUrl : theirUrl.substring(0, dmc);
  const relativeUrl = dmc == -1 ? "" : theirUrl.substring(8 + domain.length);
  const ourUrl = url.host + "/escape/";
  
  // get the requested content
  try {
    const res = await fetch(theirUrl);
    let data;
    const reqType = res.headers.get('content-type');

    // send the request content back if not html
    // otherwise parse it with cheerio
    if (reqType?.startsWith("image")) {
      data = await res.blob();
    } else {
      data = await res.text();
    }

    console.log(reqType)

    //javascript parse and replace with acorn
    if(reqType && reqType.includes("javascript")) {
      if(typeof data != "string") {
        return new Response("No.", {status: 500})
      }
      let nodes = acorn.parse(data, {ecmaVersion: 2020});
      
    }

    if (reqType && !reqType.startsWith("text/html")) return new Response(data, { headers: { 'content-type': reqType } });

    const $ = cheerioLoad(data);
    
    $('*').each((i, element) => {
      const urlAttributes = ['href', 'src', 'action', 'cite', 'data', 'formaction', 'icon', 'longdesc', 'manifest', 'poster', 'usemap'];
      
      for (const attr of urlAttributes) {
        const oldUrl = $(element).attr(attr);
        if (oldUrl) {
          $(element).attr(attr, convertUrl(oldUrl));
        }
      }
    });
    
    return new Response($.html(), { headers: { 'content-type': 'text/html' } });

    
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }

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