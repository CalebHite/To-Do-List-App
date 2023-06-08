<script lang="ts">
  export const ssr = false;
  import { auth, db as firestore } from './firebase';
  import { collectionStore, userStore } from 'sveltefire';
  import { collection, addDoc } from "firebase/firestore";
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { form, field } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  const provider = new GoogleAuthProvider();

  function signIn(){
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if(credential != null){
      const token = credential.accessToken;
    }
    const user = result.user;
  }).catch((error) => {
    console.log(error)
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }

  const user = userStore(auth);

  const items = collectionStore(firestore, 'items');

  function newItem(id: number, name: string, desc: string, time: number, completeBy: string) {
    addDoc(collection(firestore, "items"), {
      name: name,
      desc: desc,
      time: time,
      completeBy: completeBy
    });
  }
  
  let name = "";
  let time = 0;
  let whenComplete = "";
  let desc = "";

</script>

{#if $user}
    <p>Hi {$user.displayName}</p>

    <section>
      <label for="itemName">Name:</label>
      <input type="text" id="itemName" bind:value={name} />
      <label for="itemDesc">Description:</label>
      <input type="text" id="itemDesc" bind:value={desc} />
      <label for="itemTime">Hours to Complete:</label>
      <input type="number" id="itemTime" bind:value={time} />
      <label for="itemComp">Complete By:</label>
      <input type="text" id="itemComp" bind:value={whenComplete} />

      <button on:click={()=>{newItem($items.length - 1, name, desc, time, whenComplete)}}>Add Item</button>
    </section>

    {#each $items as i}
    <div>
      <h3>{i.name}</h3>
      <h4>{i.desc}</h4>
      <h4>{i.time} hours to complete</h4>
      <h4>Finish by {i.completeBy}</h4>
    </div>
    {/each} 
{:else}
    <p>Sign in...</p>
{/if}