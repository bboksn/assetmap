<script lang="ts">
    import {authClient} from '$lib/clients';
    import {goto} from '$app/navigation';
    import Button from '$lib/components/ui/button/button.svelte';
const formData = $state({
    email: '',
    username: '',
    password: '',
    password_confirm: ''
})
async function handleSignup(e:Event){
   // e.preventDefault();
    if(formData.password !== formData.password_confirm){
        alert("Passwords do not match");
        return;
    }
    await authClient.signUp.email(
        {
            email: formData.email,
             password: formData.password, 
             name: formData.username,
        },
        {
            onSuccess: async ()=>{
                goto('/auth/login');
            }
        }
    
    )
}
</script>

<h1>sign up page</h1>
<form class="background-white rounded-md p-4 shadow-md" onsubmit={handleSignup}>
    <div>
        <label>
            Email:
        <input type="email" id="email" bind:value={formData.email}>
        </label>
    </div>
    <div>
  <label>
            username:
        <input type="text" id="username" bind:value={formData.username}>
        </label>
    </div>
    <div>
        <label>
            Password:
            <input type="password" id="password" bind:value={formData.password}>
        </label>

        <div>
            <label >
                Confirm Password:
                <input type="password" id="password_confirm" bind:value={formData.password_confirm}>
            </label>
        </div>
    </div>
    <Button variant="outline" type="submit">Signup</Button>
</form>