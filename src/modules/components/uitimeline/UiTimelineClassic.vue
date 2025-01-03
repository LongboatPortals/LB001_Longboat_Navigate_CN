<template>

<div class="ui-tl-v2-item">
				<div class="ui-tl-v2-img-wrap">
					<img class="ui-tl-v2-img" :src="ImageSrc" alt="Timeline Section Images">
				</div>
				<div class="ui-tl-v2-wrap">
					<div class="ui-tl-v2-text-area">
						<slot name="title"></slot>
						<slot name="content"></slot>
					</div>
				</div>
			</div>
</template>

<script setup>

defineProps({
    ImageSrc: {
			type: String,
            required: false
		}
});
</script>

<style lang="scss">
@import "/src/apps/prw/assets/styles/settings.scss";
	.ui-tl-v2-header {
		color: $timline-heading-color;
	}	

	.ui-tl-v2-img-wrap {
		background: $timline-img-bg-color;
	}

	.ui-tl-v2-wrap {
		background-color: $timeline-item-bg-color;
	}

	.ui-tl-v2-wrap:before {
		border-right: 20px solid $timeline-item-bg-color;
	}

	/*EDIT COLOURS HERE*/




	.ui-width-limit {
		max-width: 1280px;
		margin: 0 auto;
	}

	.ui-tl-v2-item {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: start;
		-ms-flex-align: start;
		align-items: flex-start;
		position: relative;
		z-index: 1;
	}

	.ui-tl-v2-item:before {
		content: "";
		width: 3px;
		position: absolute;
		left: 24px;
		top: 0;
		bottom: -32px;
		background-color: #A8B1BD;
		z-index: -1;
	}

	.ui-tl-v2-item:last-child:before {
		height: 40px;
	}

	.ui-tl-v2-outer-wrap {
		padding: 48px 16px;
	}

	.ui-tl-v2-wrap {
		padding: 16px;
		margin-bottom: 32px;
		position: relative;
		border-radius: 6px;
		z-index: 2;
		-webkit-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .18);
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .18);
	}

	.ui-tl-v2-item:last-child .ui-tl-v2-wrap {
		margin-bottom: 0;
	}

	.ui-tl-v2-wrap:before {
		content: "";
		width: 0;
		height: 0;
		border-top: 15px solid transparent;
		border-bottom: 15px solid transparent;
		position: absolute;
		top: 10px;
		left: -19px;
	}


	.ui-tl-v2-head-wrap {
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;
		margin-bottom: 16px;
	}

	.ui-tl-v2-img-wrap {
		width: 52px;
		min-width: 52px;
		height: 52px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		margin-right: 24px;
		border-radius: 50%;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	.ui-tl-v2-img-wrap img {
		max-height: 25px;
		max-width: 25px;
	}


	.ui-tl-v2-header {
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: 32px;
		letter-spacing: 0.35px;
		text-align: left;
		margin-bottom: 16px;
	}

	.ui-tl-v2-subheader {
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: 24px;
		letter-spacing: 2px;
		text-align: left;
		margin-bottom: 24px;
	}

	.ui-tl-v2-para {
		font-weight: 400;
		line-height: 24px;
		margin-bottom: 8px;
		max-width: 100%;
	}

	.ui-tl-v2-para:last-child {
		margin-bottom: 0;
	}

	.ui-tl-v2-ol {
		list-style: decimal;
		margin-left: 20px;
		margin-top: 12px;
		margin-bottom: 12px;
	}


	.ui-tl-v2-ul {
		list-style: disc;
		margin-left: 20px;
		margin-top: 12px;
		margin-bottom: 12px;
	}

	.ui-tl-v2-ul-li,
	.ui-tl-v2-ol-li {
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0em;
		text-align: left;
		margin-bottom: 6px;
		padding-left: 8px;
	}

	.ui-tl-v2-ul-li:last-child,
	.ui-tl-v2-ol-li:last-child {
		margin-bottom: 0;
	}


	@media only screen and (max-width: 1023px) {
		.ui-tl-v2-wrap {
			padding: 16px;
		}
	}

	@media only screen and (max-width: 767px) {
		.ui-tl-v2-header {
			font-size: 20px;
			line-height: 25px;
		}
	}
</style>
