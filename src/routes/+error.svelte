<script>
	import {page} from "$app/stores";
</script>

<div class="wrap">
	<div class="title">
		<h1 class="code">
			<span class="color">Error {$page.status}</span>
			<hr class="line"/>
		</h1>
		
	</div>
	
	
	<p class="message"> 
		Page {$page.error?.message}
	</p>
</div>

<style>
	.title {
		display: flex;
		padding-top: 25vh;
		flex-direction: column;
		align-items: center;
	}
	.code {
		
		font-size: 3rem;
		font-weight: 300;
		margin: 0;
	}
	.color {
		background-image: linear-gradient(to right, #ff105f, #ffad06);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.line {
		width: 100%;
		border: 1px solid #ff105f;
		margin: 0px;
	}
	.message {
		font-size: 1.3rem;
		font-weight: 300;
		margin: 10px;
		color: #979797;

	}
</style>
