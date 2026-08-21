<script setup>
const items = [
	'Kinasis',
	'KxP',
    'Software',
    'Desarrollo',
    'Tecnología',
    'Calidad',
    'Innovación',
];

const loopItems = [...items, ...items];
</script>

<template>
	<section class="hello-separator" aria-hidden="true">
		<div class="marquee marquee-dark">
			<div class="marquee-track">
				<span
					v-for="(item, index) in loopItems"
					:key="`dark-${index}`"
					class="marquee-item"
				>
					{{ item }}
				</span>
			</div>
		</div>

		<div class="marquee marquee-light">
			<div class="marquee-track reverse">
				<span
					v-for="(item, index) in loopItems"
					:key="`light-${index}`"
					class="marquee-item"
				>
					{{ item }}
				</span>
			</div>
		</div>
	</section>
</template>

<style scoped>
.hello-separator {
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	border-radius: 0;
}

.marquee {
	position: relative;
	overflow: hidden;
	white-space: nowrap;
	height: 72px;
	display: flex;
	align-items: center;
}

.marquee::before,
.marquee::after {
	content: '';
	position: absolute;
	top: 0;
	width: 120px;
	height: 100%;
	z-index: 2;
	pointer-events: none;
}

.marquee-dark {
	background: var(--primary-color);
	color: var(--secondary-color)
}

.marquee-light {
	background: transparent;
	color: var(--primary-color)
}

.marquee-track {
	display: inline-flex;
	align-items: center;
	width: max-content;
	min-width: 200%;
	animation: marquee-left 22s linear infinite;
}

.marquee-track.reverse {
	animation: marquee-right 22s linear infinite;
}

.marquee-item {
	display: inline-flex;
	align-items: center;
	flex-shrink: 0;
	font-size: clamp(1.5rem, 3vw, 3rem);
	font-weight: 800;
	line-height: 1;
	letter-spacing: -0.03em;
	padding-right: 1rem;
}

.marquee-item::after {
	content: '·';
	display: inline-block;
	margin-left: 1rem;
	opacity: 0.95;
}

@keyframes marquee-left {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
}

@keyframes marquee-right {
	0% {
		transform: translateX(-50%);
	}
	100% {
		transform: translateX(0);
	}
}

@media (max-width: 768px) {
	.marquee {
		height: 58px;
	}

	.marquee::before,
	.marquee::after {
		width: 56px;
	}

	.marquee-item {
		padding-right: 1rem;
	}

	.marquee-item::after {
		margin-left: 1rem;
	}
}
</style>