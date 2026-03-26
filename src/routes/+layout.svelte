<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import {authClient} from '$lib/clients';
	import {goto} from '$app/navigation';
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';

	let { children } = $props();
	const session = authClient.useSession();

	$effect(() => {
		// Wait until we know if the user is logged in or not
		if ($session.isPending) return;

		// Check if we are already on an auth page (login/signup)
		const isAuthPage = page.url.pathname.startsWith('/auth');

		if (!$session.data && !isAuthPage) {
			goto('/auth/login');
		}
	});
</script>

{#if $session.isPending}
	<p>Loading...</p>
{:else if $session.data}
	<div class="p-4 flex justify-between items-center border-b">
		<span>Logged in as {$session.data.user.email}</span>
		<Button variant="outline" onclick={async () => {
			await authClient.signOut();
			goto('/auth/login');
		}}>Logout</Button>
	</div>
{/if}

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
