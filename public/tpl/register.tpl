<div id="reg">

  <ng-include src="'./tpl/header_main.tpl'"></ng-include>

  <div class="reg-form">
    <md-card>
      <md-card-title>
        <md-card-title-text>
          <span class="headline">{{ 'REGISTER_TITLE' | translate }}</span>
        </md-card-title-text>
      </md-card-title>
      <md-card-content>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.email" type="email" placeholder="{{ 'REGISTER_EMAIL' | translate }}" ng-required="true">
        </md-input-container>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.pwd" type="password" placeholder="{{ 'REGISTER_PASSWORD' | translate }}" ng-required="true">
        </md-input-container>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.fname" type="text" placeholder="{{ 'REGISTER_FNAME' | translate }}" ng-required="true">
        </md-input-container>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.lname" type="text" placeholder="{{ 'REGISTER_LNAME' | translate }}" ng-required="true">
        </md-input-container>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.lang" type="email" placeholder="Email (required)" ng-required="true">
        </md-input-container>

        <md-button class="gButton block-center" style="display:block;" ng-click="loginUser()">{{ 'LOGIN_LOGIN' | translate }}</md-button>
      </md-card-content>
    </md-card>
  </div>

</div>