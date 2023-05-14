import { load as cload } from "cheerio";

/** @type {import('./$types').RequestHandler} */
export const GET = async ({url}) => {
  // some constants
  const theirUrl: string = url.search.substring(1) || 'https://www.example.com';
  const dmc = theirUrl.indexOf("/", 8);
  const domain = dmc == -1 ? theirUrl : theirUrl.substring(0, dmc);
  const relativeUrl = dmc == -1 ? "" : theirUrl.substring(8 + domain.length);
  const ourUrl = url.origin + url.pathname + "?";
  
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

    if (reqType && !reqType.startsWith("text/html")) return new Response(data, { headers: { 'content-type': reqType } });

    const $ = cload(data);
    
    $('*').each((i, element) => {
      const urlAttributes = ['href', 'src', 'action', 'cite', 'data', 'formaction', 'href', 'icon', 'longdesc', 'manifest', 'poster', 'src', 'usemap'];
      
      for (const attr of urlAttributes) {
        const oldUrl = $(element).attr(attr);
        if (oldUrl) {
          $(element).attr(attr, convertUrl(oldUrl));
        }
      }
    });
    
    return new Response($.html(), { headers: { 'content-type': 'text/html' } });

    
  } catch (e) {
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