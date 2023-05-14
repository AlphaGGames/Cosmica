<nav>
	<div class="left">
		<a href="/">Cosmica</a>
	</div>

	<div class="right">
		<ul>
			<li>
				<a class="navbutton" href="/">Home</a>
			</li>
			<li>
				<a class="navbutton" href="/games">Games</a>
			</li>
			<li>
				<a class="navbutton" href="/escape">Proxy</a>
			</li>
			<li>
				<a class="navbutton" href="/about">About</a>
			</li>
		</ul>
	</div>
	
</nav>

<style>
	nav {
		width: 80%;
		padding-left: 10%;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-right: 10%;
		height: 50px;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
	}
	.left {
		float: left;
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
	.left a {
		margin: 0;
		background: linear-gradient(to right, #ff105f, #ffad06);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
		font-size: 2rem;
		font-weight: bold;
		cursor: pointer;
	}
	.left a:hover {
		transition: all 0.3s ease-in-out;
		transform: scale(1.1);
	}
	.right {
		float: right;
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.right ul {
		float: right;
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		list-style: none;
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		padding: 0px;
		margin: 0px;
	}
	.right li {
		margin-left: 10px;
		margin-right: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

	}
	.right li .navbutton {
		all: unset;
		text-decoration: none;
		color: #f1f1f1;
		cursor: pointer;
		font-size: 1.2rem;
	}
	.right li .navbutton::after {
		transition: all 0.5s ease-in-out;
		content: '';
		position: absolute;
		left: 0px;
		bottom: -2px;
		margin-top: 10px;
		width: 100%;
		border-radius: 10px;
		height: 2px;

		background-image: linear-gradient(to right, #ff105f 0%, #ffad06 50%, transparent 50%, transparent 100%);
		background-size: 200%;
		background-position: 100%;
		transition: cubic-bezier(0.77, 0, 0.175, 1) 0.5s;
	}
	.right li .navbutton:hover::after {
		background-position: 0%;
		
		
	}
</style>