<script lang="ts">
  export const ssr = false;
  import { auth, db as firestore } from './firebase';
  import { collectionStore, userStore } from 'sveltefire';
  import { getDatabase, ref, set } from "firebase/database";
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

  // function newItem(id: number, name: string, desc: string, time: number, completeBy: number) {
  //   set(ref(firestore, 'items/' + id), {
  //     name: name,
  //     description: desc,
  //     completeBy: completeBy,
  //     time: time
  //     });
  // }
</script>

{#if $user}
    <p>Hi {$user.displayName}</p>

    {#each $items as i}
    <div>
      <h3>{i.name}</h3>
      <h4>{i.description}</h4>
      <h4>{i.time} hours to complete</h4>
      <h4>Finish by {i.whenComplete}</h4>
    </div>
    {/each} 
{:else}
    <p>Sign in...</p>
{/if}