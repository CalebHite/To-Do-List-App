import { c as create_ssr_component, e as escape, b as validate_store, d as subscribe, f as add_attribute, h as each, v as validate_component } from "../../chunks/index.js";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { w as writable } from "../../chunks/index2.js";
const firebaseConfig = {
  apiKey: "AIzaSyDNKygdrn4CWxSTLmxHfccKyvrSGRG2upg",
  authDomain: "todolist-18229.firebaseapp.com",
  projectId: "todolist-18229",
  storageBucket: "todolist-18229.appspot.com",
  messagingSenderId: "594935609904",
  appId: "1:594935609904:web:e1537745d82dfc67970bf5"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
function collectionStore(firestore, ref, startWith = []) {
  let unsubscribe;
  if (!firestore || !globalThis.window) {
    console.warn("Firestore is not initialized or not in browser");
    const { subscribe: subscribe3 } = writable(startWith);
    return {
      subscribe: subscribe3,
      ref: null
    };
  }
  const colRef = typeof ref === "string" ? collection(firestore, ref) : ref;
  const { subscribe: subscribe2 } = writable(startWith, (set) => {
    unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((s) => {
        return { id: s.id, ref: s.ref, ...s.data() };
      });
      set(data);
    });
    return () => unsubscribe();
  });
  return {
    subscribe: subscribe2,
    ref: colRef
  };
}
function userStore(auth2) {
  let unsubscribe;
  if (!auth2 || !globalThis.window) {
    console.warn("Auth is not initialized on not in browser");
    const { subscribe: subscribe3 } = writable(null);
    return {
      subscribe: subscribe3
    };
  }
  const { subscribe: subscribe2 } = writable(auth2?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth2, (user) => {
      set(user);
    });
    return () => unsubscribe();
  });
  return {
    subscribe: subscribe2
  };
}
const Draggable_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".draggable.s-fjWxDHLZmHUV{user-select:none;cursor:move;border:solid 1px gray;position:absolute}",
  map: null
};
const Draggable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { left = 100 } = $$props;
  let { top = 100 } = $$props;
  if ($$props.left === void 0 && $$bindings.left && left !== void 0)
    $$bindings.left(left);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  $$result.css.add(css$1);
  return `<section style="${"left: " + escape(left, true) + "px; top: " + escape(top, true) + "px;"}" class="${"draggable s-fjWxDHLZmHUV"}">${slots.default ? slots.default({}) : ``}</section>

`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;900&display=swap');.s-y_bCXRrkrYfP{padding:0;margin:0;font-family:'Inter', sans-serif}:root{background:#1d1d30;background-image:url('../lib/asfalt-light.png');overflow-x:hidden}.create-item.s-y_bCXRrkrYfP,.item.s-y_bCXRrkrYfP{width:11rem;padding:3rem;position:absolute;z-index:2}.create-item.s-y_bCXRrkrYfP{top:10px}.item.s-y_bCXRrkrYfP:active{border:2px dashed #EEE2DE}.bg.s-y_bCXRrkrYfP{width:100%;height:100%;opacity:.5;background:#494878;position:absolute;top:0;left:0;z-index:-1}h1.s-y_bCXRrkrYfP{text-align:center;margin-top:20%;font-weight:900;font-size:3rem;color:#EEE2DE;text-shadow:-2px 2px #EA906C}p.s-y_bCXRrkrYfP{text-align:center;font-size:1rem;color:#EEE2DE}h2.s-y_bCXRrkrYfP,h3.s-y_bCXRrkrYfP{font-weight:900;color:#EA906C}label.s-y_bCXRrkrYfP,h4.s-y_bCXRrkrYfP{font-weight:300;color:#EEE2DE}#addItem.s-y_bCXRrkrYfP{margin-top:5%;background-color:#EEE2DE;padding:5px;border:transparent}.delete.s-y_bCXRrkrYfP{font-size:1.5rem;background:transparent;border:transparent;color:#EEE2DE;position:absolute;right:5px;top:0}.delete.s-y_bCXRrkrYfP:hover{color:#b03e3e}#addItem.s-y_bCXRrkrYfP:hover{background-color:#EA906C\r\n  }input.s-y_bCXRrkrYfP{background:transparent;border:1px solid #EEE2DE;color:#EEE2DE}.sign-in.s-y_bCXRrkrYfP{padding:.5rem;position:absolute;left:45%;top:45%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  let $items, $$unsubscribe_items;
  const ssr = false;
  new GoogleAuthProvider();
  const user = userStore(auth);
  validate_store(user, "user");
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  const items = collectionStore(db, "items");
  validate_store(items, "items");
  $$unsubscribe_items = subscribe(items, (value) => $items = value);
  let name = "";
  let time = 0;
  let whenComplete = "";
  let desc = "";
  if ($$props.ssr === void 0 && $$bindings.ssr && ssr !== void 0)
    $$bindings.ssr(ssr);
  $$result.css.add(css);
  $$unsubscribe_user();
  $$unsubscribe_items();
  return `${$user ? `<h1 class="${"s-y_bCXRrkrYfP"}">Hi ${escape($user.displayName)}</h1>
    <p class="${"s-y_bCXRrkrYfP"}">Your To Do List:</p>

      <section class="${"create-item s-y_bCXRrkrYfP"}"><h2 class="${"s-y_bCXRrkrYfP"}">Create Item</h2>
        <label for="${"itemName"}" class="${"s-y_bCXRrkrYfP"}">Name:</label>
        <br class="${"s-y_bCXRrkrYfP"}">
        <input type="${"text"}" id="${"itemName"}" class="${"s-y_bCXRrkrYfP"}"${add_attribute("value", name, 0)}>
        <br class="${"s-y_bCXRrkrYfP"}">
        <label for="${"itemDesc"}" class="${"s-y_bCXRrkrYfP"}">Description:</label>
        <input type="${"text"}" id="${"itemDesc"}" class="${"s-y_bCXRrkrYfP"}"${add_attribute("value", desc, 0)}>
        <br class="${"s-y_bCXRrkrYfP"}">
        <label for="${"itemTime"}" class="${"s-y_bCXRrkrYfP"}">Hours to Complete:</label>
        <input type="${"number"}" id="${"itemTime"}" class="${"s-y_bCXRrkrYfP"}"${add_attribute("value", time, 0)}>
        <br class="${"s-y_bCXRrkrYfP"}">
        <label for="${"itemComp"}" class="${"s-y_bCXRrkrYfP"}">Complete By:</label>
        <input type="${"text"}" id="${"itemComp"}" class="${"s-y_bCXRrkrYfP"}"${add_attribute("value", whenComplete, 0)}>
        <button id="${"addItem"}" class="${"s-y_bCXRrkrYfP"}">Add Item</button>
        <div class="${"bg s-y_bCXRrkrYfP"}"></div></section>

    ${each($items, (i) => {
    return `${validate_component(Draggable, "Draggable").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="${"item s-y_bCXRrkrYfP"}"><h3 class="${"s-y_bCXRrkrYfP"}">${escape(i.name)}</h3>
        <h4 class="${"s-y_bCXRrkrYfP"}">${escape(i.desc)}</h4>
        <br class="${"s-y_bCXRrkrYfP"}">
        <h4 class="${"s-y_bCXRrkrYfP"}"><strong class="${"s-y_bCXRrkrYfP"}">${escape(i.time)}</strong> hours to complete</h4>
        <br class="${"s-y_bCXRrkrYfP"}">
        <h4 class="${"s-y_bCXRrkrYfP"}">Finish by <strong class="${"s-y_bCXRrkrYfP"}">${escape(i.completeBy)}</strong></h4>
        <br class="${"s-y_bCXRrkrYfP"}">
        <button class="${"delete s-y_bCXRrkrYfP"}">x</button>
        <div class="${"bg s-y_bCXRrkrYfP"}"></div></div>
    `;
      }
    })}`;
  })}` : `<button class="${"sign-in s-y_bCXRrkrYfP"}"><h2 class="${"s-y_bCXRrkrYfP"}">Sign In</h2></button>`}`;
});
export {
  Page as default
};
