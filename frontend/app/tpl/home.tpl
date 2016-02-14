<div id="home">
  <div id="header">

    <div class="c" layout="row" layout-sm="column" layout-align=" end">
      <div id="header-img" flex="20"></div>
      <div id="daily-motto" flex="70">
        <span class="italic quote md-display-3">{{ 'HEADER_MOTTO' | translate }}</span>
      </div>
      <div class="translation-icons-bar" flex="10" ng-click="changeTransTo('en')" ></div>
    </div>

  </div>
  <div id="body" layout="row">
    <div id="content" flex="80">
      <md-card class="intro">
        <md-card-title class="g">
          <md-card-title-text class="text-center">
            <span class="md-headline">{{ 'MAIN_PAGE_HEADER_TITLE' | translate }}</span>
          </md-card-title-text>
        </md-card-title>
        <md-card-content>
          <div class="intro-text">
            <span>{{ 'MAIN_PAGE_CONTENT_TEXT' | translate }}</span>
          </div>
        </md-card-content>
      </md-card>

      <md-card class="about-us">
        <md-card-title class="g">
          <md-card-title-text class="text-center">
            <span class="md-headline">{{ 'ABOUT_US_TITLE' | translate }}</span>
          </md-card-title-text>
        </md-card-title>
        <md-card-content>
          <div class="about-us-henrik">
            <div class="big-profile-pic">
              <!--<img src="img/henrik.png" title="Henrik"/>-->
            </div>
            <div class="relating-line"></div>
            <div class="about-us-motto-henrik">
              <div class="about-us-motto-title">
                <span>Henrik</span>
              </div>
              <div class="about-us-motto">
                <span>{{ 'ABOUT_US_MOTTO_HENRIK' | translate }}</span>
              </div>
            </div>
          </div>

          <div class="about-us-tomi">
            <div class="big-profile-pic">
              <!--<img src="img/tomi.png" title="Tomi"/>-->
            </div>
            <div class="relating-line"></div>
            <div class="about-us-motto-tomi">
              <div class="about-us-motto-title">
                <span>Tomi</span>
              </div>
              <div class="about-us-motto">
                <span>{{ 'ABOUT_US_MOTTO_TOMI' | translate }}</span>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>

    </div>
    <div id="right-sidebar" flex="20">
      <md-card class="members-login">
        <md-card-title class="g">
          <md-card-title-text>
            <span class="md-headline">{{ 'MEMBERS' | translate }}</span>
          </md-card-title-text>
        </md-card-title>
        <md-content>
          <md-input-container md-no-float class="md-block">
            <input ng-model="user.email" type="email" placeholder="Email (required)" ng-required="true">
          </md-input-container>
          <md-input-container md-no-float class="md-block">
            <input ng-model="user.pwd" type="password" placeholder="Password (required)" ng-required="true">
          </md-input-container>
          <div class="submit">
            <md-button class="gButton block-center" style="display:block;" ng-click="loginUser()">{{ 'LOGIN_LOGIN' | translate }}</md-button>
          </div>

          <div ng-show="errorLogin">
            <span class="error-login">{{ 'LOGIN_ERROR' | translate }}</span>
          </div>
        </md-content>

      </md-card>

      <md-card class="social-media-contacts">
        <md-card-title class="g">
          <md-card-title-text>
            <span class="md-headline">{{ 'HOME_INTERESTED' | translate }}</span>
            <span class="md-headline-sub">{{ 'HOME_INTERESTED_SUB' | translate }}</span>
          </md-card-title-text>
        </md-card-title>

        <div class="social-media-boxes" layout="row">
          <div class="logo" flex="20">
            <ng-md-icon icon="facebook-box" title="{{ 'FB_G7' | translate }}"></ng-md-icon>
          </div>
          <div class="name" flex flex="80">
            <span>{{ 'FB_G7' | translate }}</span>
          </div>
        </div>

        <div class="social-media-boxes" layout="row">
          <div class="logo" flex="20">
            <ng-md-icon icon="instagram-box" title="{{ 'INSTA_G7' | translate }}"></ng-md-icon>
          </div>
          <div class="name" flex flex="80">
            <span>{{ 'INSTA_G7' | translate }}</span>
          </div>
        </div>

        <div class="social-media-boxes" layout="row">
          <div class="logo" flex="20">
            <ng-md-icon icon="twitter-box" title="{{ 'TW_G7' | translate }}"></ng-md-icon>
          </div>
          <div class="name" flex flex="80">
            <span>{{ 'TW_G7' | translate }}</span>
          </div>
        </div>

        <div class="social-media-boxes" layout="row">
          <div class="logo" flex="20">
            <ng-md-icon icon="youtube-box" title="{{ 'YT_G7' | translate }}"></ng-md-icon>
          </div>
          <div class="name" flex="80">
            <span>{{ 'YT_G7' | translate }}</span>
          </div>
        </div>

      </md-card>
    </div>
  </div>
</div>