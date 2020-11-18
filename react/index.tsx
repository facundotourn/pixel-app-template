import { canUseDOM } from 'vtex.render-runtime'

import { PixelMessage } from './typings/events'

function braindw_fn() {
  console.log("bdw-start");
  try {
    console.log("bdw-start");
    try {
      console.log("bdw-start-ready-ok");
      var a = false;
      try {
        a = navigator.cookieEnabled;
      } catch (b) {}
      try {
        console.log("bdw-start-ready-beginajax");
        var controller = new AbortController();
        setTimeout(function() {
          controller.abort();
        }, 9e3);

        fetch(
          "https://sqa.braindw.com/Script/braindw/pruebaio_produccion_hbywz?browsercookie=" + a + "&hs=" + new Date(),
          {
            credentials: "include",
            mode: "cors",
            method: "GET",
            signal: controller.signal,
          }
        )
          .then(function(b) {
            return b.text();
          })
          .then(function(b) {
            console.log("bdw-start-ready-beginajax-succress");
            var c = document.createElement("script");
            c.setAttribute("type", "text/javascript");
            c.text = b;
            document.getElementsByTagName("body")[0].appendChild(c);
          })
          ["catch"](function(b) {
            "AbortError" === b.name
              ? console.log("Fetch aborted")
              : console.error("error", b);
          });
      } catch (b) {}
    } catch (b) {}
  } catch (b) {}
}

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:pageView': {
      console.log('CAMBIÓ DE PÁGINA!', e)
      braindw_fn()
      break
    }
    case 'vtex:productClick': {
      console.log('CLICK EN PRODUCTO!', e.data.product)
      break
    }
    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
