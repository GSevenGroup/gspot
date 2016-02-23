<div id="home" ng-controller="HomeCtrl">

  <ng-include src="'./tpl/header_main.tpl'"></ng-include>

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
          <div class="about-us-henrik" layout="row">
            <div class="big-profile-pic" flex="10"></div>
            <div class="about-us-motto" flex="70">
              <div class="about-us-motto-title">
                <span>Henrik</span>
              </div>
              <div class="about-us-motto-text">
                <span>{{ 'ABOUT_US_MOTTO_HENRIK' | translate }}</span>
              </div>
            </div>
          </div>

          <div class="about-us-tomi" layout="row">
            <div class="big-profile-pic" flex="10"></div>
            <div class="about-us-motto" flex="70">
              <div class="about-us-motto-title">
                <span>Tomi</span>
              </div>
              <div class="about-us-motto-text">
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
            <input ng-model="loginUser.username" type="email" placeholder="Email (required)" ng-required="true">
          </md-input-container>
          <md-input-container md-no-float class="md-block">
            <input ng-model="loginUser.password" type="password" placeholder="Password (required)" ng-required="true">
          </md-input-container>
          <div class="submit">
            <md-button class="gButton block-center" style="display:block;" ng-click="login()">{{ 'LOGIN_LOGIN' | translate }}</md-button>
          </div>

          <div ng-show="errorLogin">
            <span class="error-login">{{ 'LOGIN_ERROR' | translate }}</span>
          </div>
        </md-content>

      </md-card>

      <md-card class="social-media-contacts">
        <md-card-title class="g">
          <md-card-title-text>
            <span class="md-headline">{{ 'HOME_INTERESTED' | translate }}<br/></span>
            <span class="md-headline-sub">{{ 'HOME_INTERESTED_SUB' | translate }}</span>
          </md-card-title-text>
        </md-card-title>

        <div class="social-media-boxes">
          <div class="row fb">
            <span>{{ 'FB_G7' | translate }}</span>
          </div>
        </div>

        <div class="social-media-boxes">
          <div class="row ig">
            <span>{{ 'INSTA_G7' | translate }}</span>
          </div>
        </div>

        <div class="social-media-boxes">
          <div class="row tw">
            <span>{{ 'TW_G7' | translate }}</span>
          </div>
        </div>

        <div class="social-media-boxes">
          <div class="row yt">
            <span>{{ 'YT_G7' | translate }}</span>
          </div>
        </div>

      </md-card>
    </div>
  </div>
</div>