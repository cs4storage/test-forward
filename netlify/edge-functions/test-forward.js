
import { Context } from "https://edge.netlify.com";

const TOKEN_HEADER = 'Px-Token'
const TOKEN_VALUE = 'mysecuretoken'
const HOST_HEADER = 'Px-Host'
const IP_HEADER = 'Px-IP'

export default async (request, context) => {

  /*
  const joke = await fetch("https://icanhazdadjoke.com/", {
    "headers": {
      "Accept": "application/json"
    }
  });
  const jsonData = await joke.json();
  return context.json(jsonData);
  */
  context.log(request.url)
  return forwardReq(request,context)
};




async function forwardReq(request, context) {

    //console = context;

    if (request.headers.get(TOKEN_HEADER) != TOKEN_VALUE) {
      //return new Response("Welcome to nginx! 9999999")
      context.log("Welcome to nginx! 9999999")
    }
  
    
    
    let newHdrs = new Headers()
    for (const [key, value] of request.headers) {
      context.log( "request header -- " key + ": " +  value )

      if (key.toLowerCase() == TOKEN_HEADER.toLowerCase()) {
          continue;
      }
      if (key.toLowerCase() == HOST_HEADER.toLowerCase()) {
          continue;
      }
      if (key.toLowerCase() == IP_HEADER.toLowerCase()) {
          continue;
      }
      if (key.toLowerCase().startsWith('cf-')) {
          continue;
      }
      if (key.toLowerCase() == 'x-forwarded-for') {
          continue;
      }
      if (key.toLowerCase() == 'x-real-ip') {
          continue;
      }
      
      newHdrs.set(key, value)
      newHdrs.append(key, value)
    }
    newHdrs.set('Host', request.headers.get(HOST_HEADER))
    context.log('set new header host: ' + request.headers.get(HOST_HEADER) )


    //newHdrs.set('X-Forwarded-For', request.headers.get(IP_HEADER))
    //console.log("newHdrs: " + JSON.stringify(newHdrs))
    //console.log("newHdrs: " + newHdrs.toString())
    //console.log("org headers: " + request.headers.toString())

    
    for (const [key, value] of newHdrs){
      //context.log("new headers  " + key + ": " + value)
    }
    
  
    
    let address = ''
    const url = new URL(request.url)
    //address = request.url.replace(url.hostname, request.headers.get(HOST_HEADER))
    //context.log(url)
    //console.log(request.headers.get(HOST_HEADER))
  
    address = request.url.replace(url.hostname, request.headers.get(HOST_HEADER))
    //address3 = request.url.replace(url.hostname, 'ipinfo.io')
    context.log("will forward to address:" + address)
  

    const init = {
      body: request.body,
      headers: newHdrs,
      method: request.method
    }
  

  
    console.log(JSON.stringify(init))

    
      
    //Cache-Control: private, no-store
    /*
    let response0 = await fetch('https://myip.webtest137.workers.dev');
    context.log('POP ip is: ' + await response0.text())
    let response1 = await fetch('https://ip.webtest137.workers.dev'+context.ip);
    context.log('your ip is: ' + await response1.text())
    */
    
    /*
    const fetchReq1 = fetch(
      `https://jsonplaceholder.typicode.com/todos/1`
    ).then((res) => res.json());
    
    const fetchReq2 = fetch(
      `https://jsonplaceholder.typicode.com/todos/2`
    ).then((res) => res.json());
    
    const fetchReq3 = fetch(
      `https://jsonplaceholder.typicode.com/todos/3`
    ).then((res) => res.json());
    
    // do fetch requests in parallel
    // using the Promise.all() method
    const allData = Promise.all([fetchReq1, fetchReq2, fetchReq3]);
    
    // attach then() handler to the allData Promise
    allData.then((res) => console.log(res));
    */
    
    const fetchReq1 = fetch(
      `https://ipinfo.io/json`
    ).then((res) => { context.log(res.json())});
    
  
    //let response = await fetch (address, init);
    let response = await fetch (address, init);

    
    //let response3 = await fetch ('https://www.baidu.com', init3);

    /*
    let resp_tt = await fetch("https://ipinfo.io/json");
    //console.log("==== IPINFO: " + resp_tt.body)
    const text = await resp_tt.text();
    console.log("==== IPINFO: " + text)
    //console.log("==== IPINFO: " + resp_tt.body.json())
    */
  
  
    return response
    //return new Response("Test forward ... ")

  }
  