<script lang="ts">
	import LoginForm from "$lib/components/auth/login/login-form.svelte";
	import {authClient} from '$lib/clients';
	import {goto} from '$app/navigation';

	let formData = $state({
        email: "",
        password: "",
    });

    // Check for existing session
    const session = authClient.useSession();
    $effect(() => {
        if ($session.data?.user) {
            // User is signed in, redirect
            goto('/');  // Or wherever logged-in users should go
        }
    });

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        try {
            await authClient.signIn.email({
                email: formData.email,
                password: formData.password
            }, {
                onSuccess: () => {
                    goto('/');
                },
                onError: (ctx) => {
                    alert(ctx.error.message || "Login failed");
                }
            });
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    async function handleGoogle() {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/"
            }, {
                onError: (ctx) => {
                    alert(ctx.error.message || "Google login failed");
                }
            });
        } catch (error) {
            console.error('Google login failed:', error);
        }
    }

</script>

<div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm">
        <LoginForm formData={formData} handleSubmit={handleSubmit} handleGoogle={handleGoogle}/>
    </div>
</div>
