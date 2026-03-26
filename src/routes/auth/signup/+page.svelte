<script lang="ts">
    import SignupForm from "$lib/components/auth/signup/signup-form.svelte";
    import { goto } from "$app/navigation";
    import { authClient } from '$lib/clients';

    let formData = $state({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    // Check for existing session
    const session = authClient.useSession();
    $effect(() => {
        if ($session.data?.user) {
            // User is signed in, redirect
            goto('/');  // Or wherever logged-in users should go
        }
    });

    async function handleSignup(e: Event) {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await authClient.signUp.email(
                {
                    email: formData.email,
                    password: formData.password,
                    name: formData.username,
                },
                {
                    onSuccess: async () => {
                        goto('/auth/login');
                    },
                    onError: (ctx) => {
                        alert(ctx.error.message || "Signup failed");
                    }
                }
            );
        } catch (error) {
            console.error('Signup failed:', error);
        }
    }

    async function handleGoogleSignup() {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/"
            }, {
                onError: (ctx) => {
                    alert(ctx.error.message || "Google signup failed");
                }
            });
        } catch (error) {
            console.error('Google signup failed:', error);
        }
    }
</script>

<div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm">
        <SignupForm formData={formData} handleSubmit={handleSignup} handleGoogle={handleGoogleSignup} />
    </div>
</div>
