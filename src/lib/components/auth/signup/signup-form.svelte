<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Field from "$lib/components/ui/field/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import type { ComponentProps } from "svelte";

	//let { ...restProps }: ComponentProps<typeof Card.Root> = $props();

// destructuring props here to make the component easy to add to a page hook up with some kind of formdata and auth system and also will make my actual page code much cleaner to read
		let {
		formData = $bindable({ username: "", email: "", password: "", confirmPassword: "" }),
		handleSubmit = ((e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) => {}) as (e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) => void,
		handleGoogle = (() => {}) as () => void,
		...restProps
	} = $props();
	
</script>

<Card.Root {...restProps}>
	<Card.Header>
		<Card.Title>Create an account</Card.Title>
		<Card.Description>Enter your information below to create your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form onsubmit={handleSubmit}>
			<Field.Group>
				<Field.Field>
					<Field.Label for="name">Username</Field.Label>
					<Input bind:value={formData.username} type="text" placeholder="John Doe" required />
				</Field.Field>
				<Field.Field>
					<Field.Label for="email">Email</Field.Label>
					<Input bind:value={formData.email} type="email" placeholder="m@example.com" required />
					<Field.Description>
						We'll use this to contact you. We will not share your email with anyone
						else.
					</Field.Description>
				</Field.Field>
				<Field.Field>
					<Field.Label for="password">Password</Field.Label>
					<Input bind:value={formData.password} id="password" type="password" required />
					<Field.Description>Must be at least 8 characters long.</Field.Description>
				</Field.Field>
				<Field.Field>
					<Field.Label for="confirm-password">Confirm Password</Field.Label>
					<Input bind:value={formData.confirmPassword} id="confirm-password" type="password" required />
					<Field.Description>Please confirm your password.</Field.Description>
				</Field.Field>
				<Field.Group>
					<Field.Field>
						<Button type="submit">Create Account</Button>
						<Button onclick={handleGoogle} variant="outline" type="button">Sign up with Google</Button>
						<Field.Description class="px-6 text-center">
							Already have an account? <a href="/auth/login">Sign in</a>
						</Field.Description>
					</Field.Field>
				</Field.Group>
			</Field.Group>
		</form>
	</Card.Content>
</Card.Root>
