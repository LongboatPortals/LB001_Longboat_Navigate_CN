<template>
<section id="ui_si_v2" class="ui-si-v2-wrapper ui-section">
    <div class="ui-width-limit">
        <div class="ui-si-v2-flex">

            <div class="ui-si-v2-flex-item" role="none">
                <div class="ui-si-v2-icon">
                    <!--<img id="img1" class="ui-sa-img" src="@/assets/ui-dws-pp.png" alt="">-->
                    <i aria-hidden="true" class="ui-sa-img fa-duotone fa-calendar-plus"></i>
                </div>
                <h2 id="head1" class="ui-si-v2-heading">{{t('prw.info_sites')}}</h2>
                <p id="p1" class="ui-si-v2-para">{{t('prw.info_sites_label')}}</p>
            </div>
            <div class="ui-si-v2-flex-item" role="none">
                <div class="ui-si-v2-icon">
                    <!--<img id="img2" class="ui-sa-img" src="@/assets/ui-dws-docs.png" alt="">-->
                    <i aria-hidden="true" class="ui-sa-img fa-duotone fas fa-users"></i>
                </div>
                <h2 id="head2" class="ui-si-v2-heading">{{t('prw.info_patients')}}</h2>
                <p id="p2" class="ui-si-v2-para">{{t('prw.info_patients_label')}}</p>
            </div>
            <div class="ui-si-v2-flex-item" role="none">
                <div class="ui-si-v2-icon">
                    <!--<img id="img3" class="ui-sa-img" src="@/assets/ui-dws-docs.png"  alt="">-->
                    <i aria-hidden="true" class="ui-sa-img fa-duotone fa-globe-americas"></i>
                </div>
                <h2 id="head3" class="ui-si-v2-heading">{{t('prw.info_countries')}}</h2>
                <p id="p3" class="ui-si-v2-para">{{t('prw.info_countries_label')}}</p>
            </div>

        </div>
    </div>
</section>
</template>

<script setup>
    import { useI18n } from 'vue-i18n';
    
    const { t } = useI18n();
</script>

<style lang="scss" scoped>
@import "../assets/styles/_settings.scss";
.ui-si-v2-wrapper {
  background-image: url("../../../assets/images/bg3.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.ui-si-v2-icon {
    @include site-info-icon-bg;
    color: #fff;
}

.ui-si-v2-heading {
    color: $accent-color;
}

p.ui-si-v2-para {
    color: #fff;
}

/*EDIT COLOURS HERE*/

.ui-width-limit {
    max-width: 1280px;
    margin: 0 auto;
}


.ui-si-v2-flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;

    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}

.ui-si-v2-flex-item {
    margin: 16px 24px;
    padding: 16px;
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    position: relative;
}

.ui-si-v2-icon {
    width: 110px;
    height: 110px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 0 auto;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 1px 1px 13px 4px rgba(0, 0, 0, .08);
    box-shadow: 1px 1px 13px 4px rgba(0, 0, 0, .08);
    margin-bottom: 24px;
}

.ui-si-v2-icon img {
    max-height: 73px;
    max-width: 73px;
}

.ui-si-v2-heading {
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 45px;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 8px;
}

p.ui-si-v2-para {
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 2px;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 0;
}

@media only screen and (max-width: 1023px) {
    .ui-si-v2-flex-item {
        margin: 16px 8px;
        padding: 8px;
        flex-basis: 28%;
    }
}

@media only screen and (max-width: 767px) {
    .ui-si-v2-flex-item {
        -ms-flex-preferred-size: 100%;
        flex-basis: 100%;
        margin: 0 0 48px;
    }

    .ui-si-v2-wrapper {
        padding: 80px 16px 32px;
    }
}

.ui-sa-img {
    font-size: 3em;
}


.fa-calendar-plus, .fa-users, .fa-globe-americas {
    --fa-primary-color: #fff; 
    --fa-primary-opacity: 1; 
    --fa-secondary-color: #dfdfdf;
    --fa-secondary-opacity: 0.5; 
}
</style>
