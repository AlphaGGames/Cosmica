<script lang="ts">
	let blob: HTMLElement;

	let blobmove = (e: MouseEvent) => {
		blob.animate([
			{top: `${e.clientY}px`,
			left: `${e.clientX}px`}
		], {
			duration: 5000,
			fill: "forwards"
		})
	}	
</script>

<svelte:window on:mousemove={blobmove}/>

<div class="wrap">
	<div class="subWrap">
		<div class="title">
			<h1>Cosmica</h1>
		</div>
		
		<div class="holder">
			<div class="buttons">
				<a href="/games">
					Play Unblocked Games
				</a>
				
				<a href="/about">
					How it works
				</a>
			</div>
		</div>
		
	</div>
</div>

<div class="blob" bind:this={blob}>

</div>




<style>
	.title {
		margin-top: 25vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.title h1 {
		font-size: 3rem;
		font-weight: bold;
		margin: 0;
		padding: 0;
		background: linear-gradient(to right, #ff105f, #ffad06);;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.holder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.buttons a {
		display: block;
		margin: 10px;
		padding: 10px;
		color: #fff;
		text-decoration: none;
		text-align: center;
		border-radius: 5px;
		width: 100%;
		flex-grow: 1;

		background: linear-gradient(to right, #ffad06 20%, #ff105f 40%, #ff105f 80%, blue 100%);
		background-size: 500%;
		background-position: 50%;
		transition: all 0.5s ease-in-out;
	}
	.buttons a:hover {
		background-position: 0%;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		height: 100vh;
	}

	.subWrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(50px);
		background: rgba(0,0,0,0.5);
	}
	.blob {
		position: fixed;
		top: 0;
		left: 0;
		width: 15vw;
		height: 15vw;
		background: linear-gradient(to right, #ff105f, #ffad06);
		border-radius: 50%;
		translate: -50% -50%;
		z-index: -1;
		opacity: 0.2;
		
		animation: rotatescale 5s infinite ease-in-out;

	}

	@keyframes rotatescale {
		from {
			transform: rotate(0deg) scale(1);
			scale: 1 1;
		}
		50% {
			scale: 1 1.2;
		}
		to {
			transform: rotate(360deg) scale(1);
			scale: 1 1;
		}
	}
</style>
