<script module>
	export type CardPackType = 'booster' | 'elite';
	export type CardPackStatus = 'plain' | 'default' | 'claim';

	const packAssets: Record<
		CardPackType,
		{
			bg: string;
			colors: string[];
		}
	> = {
		elite: {
			bg: '/cards/pack/elite.png',
			colors: ['#DED08D', '#F8F2AD']
		},
		booster: {
			bg: '/cards/pack/booster.png',
			colors: ['#8CC63F', '#E1FFBA']
		}
	};
</script>

<script lang="ts">
	let {
		type = 'booster',
		status = 'default'
	}: {
		type?: CardPackType;
		status?: CardPackStatus;
	} = $props();

	const assets = $derived(packAssets[type]);
</script>

<svg
	class="card-pack"
	viewBox="0 0 189 164"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
>
	{#if status === 'default'}
		<ellipse
			cx="94.4941"
			cy="61.5911"
			rx="50"
			ry="53.5965"
			fill={`url(#background-gradient-${type})`}
		/>
	{/if}

	{#if status === 'claim'}
		<!-- rainbow-graident -->
		<path
			d="M110.976 107.512C144.974 85.9029 165.157 56.7779 156.056 42.4593C146.955 28.1406 112.016 34.0504 78.0189 55.6592C44.0214 77.268 23.8387 106.393 32.9396 120.712C42.0406 135.03 76.9788 129.121 110.976 107.512Z"
			fill="url(#rainbow-gradient-side-1)"
		/>
		<path
			d="M166.878 130.378C179.089 112.26 156.581 75.7308 116.604 48.7867C76.6277 21.8425 34.3214 14.687 22.1102 32.8044C9.89908 50.9218 32.4073 87.4514 72.3837 114.396C112.36 141.34 154.667 148.495 166.878 130.378Z"
			fill="url(#rainbow-gradient-side-2)"
		/>
		<!-- rainbow-graident end -->
	{/if}

	<!-- shadow -->
	<g opacity="0.55" filter="url(#card_shadow)">
		<path
			d="M96.0284 111.575L140.868 112.673L116.984 125.575L64.7363 123.902L96.0284 111.575Z"
			fill="black"
		/>
	</g>
	<!-- shadow end -->

	<!-- card-image -->
	<rect x="68.4941" y="41.0911" width="52" height="81" fill={`url(#card_pack_image_${type})`} />

	{#if status === 'claim'}
		<!-- twrinkle -->
		<g style="mix-blend-mode:overlay">
			<path
				d="M62.5039 70.3711C65.8176 70.3711 68.5039 67.6848 68.5039 64.3711C68.5039 61.0574 65.8176 58.3711 62.5039 58.3711C59.1902 58.3711 56.5039 61.0574 56.5039 64.3711C56.5039 67.6848 59.1902 70.3711 62.5039 70.3711Z"
				fill="url(#paint3_radial_2224_5141)"
			/>
			<path
				d="M72.5039 71.3711C74.1608 71.3711 75.5039 70.0279 75.5039 68.3711C75.5039 66.7142 74.1608 65.3711 72.5039 65.3711C70.8471 65.3711 69.5039 66.7142 69.5039 68.3711C69.5039 70.0279 70.8471 71.3711 72.5039 71.3711Z"
				fill="url(#paint4_radial_2224_5141)"
			/>
			<path
				d="M66.5039 84.3711C73.6836 84.3711 79.5039 78.5508 79.5039 71.3711C79.5039 64.1914 73.6836 58.3711 66.5039 58.3711C59.3242 58.3711 53.5039 64.1914 53.5039 71.3711C53.5039 78.5508 59.3242 84.3711 66.5039 84.3711Z"
				fill="url(#paint5_radial_2224_5141)"
			/>
			<path
				d="M113.504 64.3711C117.37 64.3711 120.504 61.2371 120.504 57.3711C120.504 53.5051 117.37 50.3711 113.504 50.3711C109.638 50.3711 106.504 53.5051 106.504 57.3711C106.504 61.2371 109.638 64.3711 113.504 64.3711Z"
				fill="url(#paint6_radial_2224_5141)"
			/>
			<path
				d="M111.504 92.3711C116.474 92.3711 120.504 88.3417 120.504 83.3711C120.504 78.4005 116.474 74.3711 111.504 74.3711C106.533 74.3711 102.504 78.4005 102.504 83.3711C102.504 88.3417 106.533 92.3711 111.504 92.3711Z"
				fill="url(#paint7_radial_2224_5141)"
			/>
			<path
				d="M127.504 87.3711C128.608 87.3711 129.504 86.4757 129.504 85.3711C129.504 84.2665 128.608 83.3711 127.504 83.3711C126.399 83.3711 125.504 84.2665 125.504 85.3711C125.504 86.4757 126.399 87.3711 127.504 87.3711Z"
				fill="url(#paint8_radial_2224_5141)"
			/>
			<path
				d="M66.3039 97.4011C70.6117 97.4011 74.1039 93.9089 74.1039 89.6011C74.1039 85.2933 70.6117 81.8011 66.3039 81.8011C61.9961 81.8011 58.5039 85.2933 58.5039 89.6011C58.5039 93.9089 61.9961 97.4011 66.3039 97.4011Z"
				fill="url(#paint9_radial_2224_5141)"
			/>
			<path
				d="M75.4743 108.771C78.8046 108.771 81.5043 106.071 81.5043 102.741C81.5043 99.4108 78.8046 96.7111 75.4743 96.7111C72.1441 96.7111 69.4443 99.4108 69.4443 102.741C69.4443 106.071 72.1441 108.771 75.4743 108.771Z"
				fill="url(#paint10_radial_2224_5141)"
			/>
			<path
				d="M66.6839 118.831C70.097 118.831 72.8639 116.064 72.8639 112.651C72.8639 109.238 70.097 106.471 66.6839 106.471C63.2708 106.471 60.5039 109.238 60.5039 112.651C60.5039 116.064 63.2708 118.831 66.6839 118.831Z"
				fill="url(#paint11_radial_2224_5141)"
			/>
			<path
				d="M92.5039 115.371C96.3699 115.371 99.5039 112.237 99.5039 108.371C99.5039 104.505 96.3699 101.371 92.5039 101.371C88.6379 101.371 85.5039 104.505 85.5039 108.371C85.5039 112.237 88.6379 115.371 92.5039 115.371Z"
				fill="url(#paint12_radial_2224_5141)"
			/>
			<path
				d="M112.504 109.371C117.474 109.371 121.504 105.342 121.504 100.371C121.504 95.4005 117.474 91.3711 112.504 91.3711C107.533 91.3711 103.504 95.4005 103.504 100.371C103.504 105.342 107.533 109.371 112.504 109.371Z"
				fill="url(#paint13_radial_2224_5141)"
			/>
			<path
				d="M129.504 112.371C130.608 112.371 131.504 111.476 131.504 110.371C131.504 109.267 130.608 108.371 129.504 108.371C128.399 108.371 127.504 109.267 127.504 110.371C127.504 111.476 128.399 112.371 129.504 112.371Z"
				fill="url(#paint14_radial_2224_5141)"
			/>
			<path
				d="M121.344 129.121C128.988 129.121 135.184 122.925 135.184 115.281C135.184 107.637 128.988 101.441 121.344 101.441C113.7 101.441 107.504 107.637 107.504 115.281C107.504 122.925 113.7 129.121 121.344 129.121Z"
				fill="url(#paint15_radial_2224_5141)"
			/>
			<path
				d="M80.1443 77.3511C91.6097 77.3511 100.904 68.0565 100.904 56.5911C100.904 45.1257 91.6097 35.8311 80.1443 35.8311C68.6788 35.8311 59.3843 45.1257 59.3843 56.5911C59.3843 68.0565 68.6788 77.3511 80.1443 77.3511Z"
				fill="url(#paint16_radial_2224_5141)"
			/>
			<path
				d="M122.954 89.7911C130.598 89.7911 136.794 83.5947 136.794 75.9511C136.794 68.3075 130.598 62.1111 122.954 62.1111C115.311 62.1111 109.114 68.3075 109.114 75.9511C109.114 83.5947 115.311 89.7911 122.954 89.7911Z"
				fill="url(#paint17_radial_2224_5141)"
			/>
			<path
				d="M71.7541 83.0111C83.2196 83.0111 92.5141 73.7165 92.5141 62.2511C92.5141 50.7857 83.2196 41.4911 71.7541 41.4911C60.2887 41.4911 50.9941 50.7857 50.9941 62.2511C50.9941 73.7165 60.2887 83.0111 71.7541 83.0111Z"
				fill="url(#paint18_radial_2224_5141)"
			/>
			<path
				d="M121.754 124.971C133.22 124.971 142.514 115.677 142.514 104.211C142.514 92.7457 133.22 83.4511 121.754 83.4511C110.289 83.4511 100.994 92.7457 100.994 104.211C100.994 115.677 110.289 124.971 121.754 124.971Z"
				fill="url(#paint19_radial_2224_5141)"
			/>
			<path
				d="M111.954 61.7411C119.598 61.7411 125.794 55.5447 125.794 47.9011C125.794 40.2575 119.598 34.0611 111.954 34.0611C104.311 34.0611 98.1143 40.2575 98.1143 47.9011C98.1143 55.5447 104.311 61.7411 111.954 61.7411Z"
				fill="url(#paint20_radial_2224_5141)"
			/>
		</g>
		<!-- twrinkle end -->
	{/if}

	<defs>
		<pattern
			id={`card_pack_image_${type}`}
			patternContentUnits="objectBoundingBox"
			width="1"
			height="1"
		>
			<use xlink:href={`#image_card_${type}`} transform="scale(0.00107066 0.000692042)" />
		</pattern>

		<image
			id={`image_card_${type}`}
			width="934"
			height="1445"
			preserveAspectRatio="xMidYMin slice"
			xlink:href={assets.bg}
		/>

		<filter
			id="card_shadow"
			x="56.7363"
			y="103.575"
			width="92.1318"
			height="30"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
			<feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur_2224_5141" />
		</filter>

		<radialGradient
			id={`background-gradient-${type}`}
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(94.4941 81.5911) rotate(90) scale(63.5965 50)"
		>
			<stop offset="0.149067" stop-color={assets.colors[0]} />
			<stop offset="0.903894" stop-color={assets.colors[1]} stop-opacity="0" />
		</radialGradient>

		<radialGradient
			id="rainbow-gradient-side-1"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(94.4976 81.5855) rotate(-31.8164) scale(69.7827 29.3822)"
		>
			<stop stop-color="#C675DB" />
			<stop offset="1" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="rainbow-gradient-side-2"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(98.2949 81.5911) rotate(38.6625) scale(81.9631 36.428)"
		>
			<stop stop-color="#FFA46C" />
			<stop offset="1" stop-color="#FFA46C" stop-opacity="0" />
		</radialGradient>

		<!-- twrinkle -->
		<radialGradient
			id="twrikle-1"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(62.5039 64.3711) scale(6)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint4_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(72.5039 68.3711) scale(3)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint5_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(66.5039 71.3711) scale(13)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint6_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(113.504 57.3711) scale(7 7)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint7_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(111.504 83.3711) scale(9 9)"
		>
			<stop offset="0.19" stop-color="white" />
			<stop offset="0.49" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint8_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(127.504 85.3711) scale(2)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint9_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(66.3039 89.6011) scale(7.8)"
		>
			<stop offset="0.19" stop-color="white" />
			<stop offset="0.49" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint10_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(75.4743 102.741) scale(6.03)"
		>
			<stop offset="0.19" stop-color="white" />
			<stop offset="0.49" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint11_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(66.6839 112.651) scale(6.18 6.18)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint12_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(92.5039 108.371) scale(7)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint13_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(112.504 100.371) scale(9 9)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint14_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(129.504 110.371) scale(2)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint15_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(121.344 115.281) scale(13.84 13.84)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint16_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(80.1443 56.5911) scale(20.76)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint17_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(122.954 75.9511) scale(13.84 13.84)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint18_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(71.7541 62.2511) scale(20.76)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#C675DB" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#C675DB" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint19_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(121.754 104.211) scale(20.76 20.76)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#BBDB75" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#BBDB75" stop-opacity="0" />
		</radialGradient>
		<radialGradient
			id="paint20_radial_2224_5141"
			cx="0"
			cy="0"
			r="1"
			gradientUnits="userSpaceOnUse"
			gradientTransform="translate(111.954 47.9011) scale(13.84 13.84)"
		>
			<stop stop-color="white" />
			<stop offset="0.2" stop-color="#BBDB75" stop-opacity="0.5" />
			<stop offset="0.9" stop-color="#BBDB75" stop-opacity="0" />
		</radialGradient>
	</defs>
</svg>
