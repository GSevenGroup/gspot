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

        <md-input-container>
          <label>{{ 'LANG_SELECT' | translate}}</label>
          <md-select ng-model="registerModel.lang">
            <md-option value="en">
              {{ 'LANG_EN' | translate }}
            </md-option>
            <md-option value="hu">
              {{ 'LANG_HU' | translate }}
            </md-option>
          </md-select>
        </md-input-container>

        <md-button class="gButton block-center" style="display:block;" ng-click="register()">{{ 'REGISTER' | translate }}</md-button>
      </md-card-content>
    </md-card>
  </div>

</div>