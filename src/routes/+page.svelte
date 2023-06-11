<script lang="ts">
  export const ssr = false;
  import { auth, db as firestore } from './firebase';
  import { collectionStore, userStore } from 'sveltefire';
  import { collection, doc, addDoc, deleteDoc  } from "firebase/firestore";
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import Draggable from './Draggable.svelte';

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
    if(name != "" && desc != "" && time !> 0 && time != null && completeBy != ""){
      addDoc(collection(firestore, "items"), {
      name: name,
      desc: desc,
      time: time,
      completeBy: completeBy
    });
    }
  }

  function delItem(id: string){
    deleteDoc(doc(firestore, "items", id));
  }
  
  let name = "";
  let time = 0;
  let whenComplete = "";
  let desc = "";

</script>

{#if $user}
    <h1>Hi {$user.displayName}</h1>
    <p>Your To Do List:</p>

      <section class="create-item">
        <h2>Create Item</h2>
        <label for="itemName">Name:</label>
        <br>
        <input type="text" id="itemName" bind:value={name} />
        <br>
        <label for="itemDesc">Description:</label>
        <input type="text" id="itemDesc" bind:value={desc} />
        <br>
        <label for="itemTime">Hours to Complete:</label>
        <input type="number" id="itemTime" bind:value={time} />
        <br>
        <label for="itemComp">Complete By:</label>
        <input type="text" id="itemComp" bind:value={whenComplete} />
        <button id="addItem" on:click={()=>{
          newItem($items.length - 1, name, desc, time, whenComplete);
          name = "";
          desc = "";
          time = 0;
          whenComplete = "";
          }}>Add Item</button>
        <div class="bg"></div>
      </section>

    {#each $items as i}
    <Draggable>
      <div class="item">
        <h3>{i.name}</h3>
        <h4>{i.desc}</h4>
        <br>
        <h4><strong>{i.time}</strong> hours to complete</h4>
        <br>
        <h4>Finish by <strong>{i.completeBy}</strong></h4>
        <br>
        <button on:click={()=>{delItem(i.id)}} class="delete">x</button>
        <div class="bg"></div>
      </div>
    </Draggable>
    {/each} 
{:else}
    <p>Signing in...</p>
{/if}

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;900&display=swap');
  *{
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif;
  }
  :root{
    background: #1d1d30;
    background-image: url('../lib/asfalt-light.png');
    overflow-x: hidden;
  }
  .create-item, .item{
    width: 11rem;
    padding: 3rem;
    position: absolute;
    z-index: 2;
  }
  .create-item{
    top: 10px;
  }
  .item:active{
    border: 2px dashed #EEE2DE;
  }
  .bg{
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #494878;
    position: absolute;
    top: 0;
    left: 0; 
    z-index: -1;
  }

  h1{
    text-align: center;
    margin-top: 20%;
    font-weight: 900;
    font-size: 3rem;
    color: #EEE2DE;
    text-shadow: -2px 2px #EA906C;
  }
  p{
    text-align: center;
    font-size: 1rem;
    color: #EEE2DE;
  }
  h2, h3{
    font-weight: 900;
    color: #EA906C;
  }
  label, h4, h5, h6{
    font-weight: 300;
    color: #EEE2DE;
  }
  #addItem{
    margin-top: 5%;
    background-color: #EEE2DE;
    padding: 5px;
    border: transparent;
  }
  .delete{
    font-size: 1.5rem;
    background: transparent;
    border: transparent;
    color: #EEE2DE;
    position: absolute;
    right: 5px;
    top: 0;
  }
  .delete:hover{
    color: #b03e3e;
  }
  #addItem:hover{
    background-color: #EA906C
  }
  input{
    background: transparent;
    border: 1px solid #EEE2DE;
    color: #EEE2DE;
  }
</style>