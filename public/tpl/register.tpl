<div id="reg">

  <ng-include src="'./tpl/header_main.tpl'"></ng-include>

  <div class="reg-form">
    <md-card>
      <md-card-title>
        <md-card-title-text>
          <span class="md-headline">{{ 'REGISTER_TITLE' | translate }} <br/></span>
          <span class="md-headline-sub" ng-if="isRegErrorFromBE">{{ 'REGISTER_ERROR' | translate }}</span>
        </md-card-title-text>
      </md-card-title>
      <md-card-content>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.email" type="email" placeholder="{{ 'REGISTER_EMAIL' | translate }}" ng-required="true" ng-change="validate('email')">
        </md-input-container>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.password" type="password" placeholder="{{ 'REGISTER_PASSWORD' | translate }}" ng-required="true" ng-change="validate('password')">
        </md-input-container>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.name" type="text" placeholder="{{ 'REGISTER_NAME' | translate }}" ng-required="true" ng-change="validate('name')">
        </md-input-container>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.country" type="text" placeholder="{{ 'REGISTER_COUNTRY' | translate }}" ng-required="true" ng-change="validate('country')">
        </md-input-container>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.city" type="text" placeholder="{{ 'REGISTER_CITY' | translate }}" ng-required="true" ng-change="validate('city')">
        </md-input-container>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.address" type="text" placeholder="{{ 'REGISTER_ADDRESS' | translate }}" ng-required="true" ng-change="validate('address')">
        </md-input-container>

        <md-input-container md-no-float class="md-block">
          <input ng-model="registerModel.phone" type="text" placeholder="{{ 'REGISTER_PHONE' | translate }}" ng-required="true" ng-change="validate('phone')">
        </md-input-container>

        <!--<md-input-container>-->
          <!--<label>{{ 'LANG_SELECT' | translate}}</label>-->
          <!--<md-select ng-model="registerModel.lang">-->
            <!--<md-option value="en">-->
              <!--{{ 'LANG_EN' | translate }}-->
            <!--</md-option>-->
            <!--<md-option value="hu">-->
              <!--{{ 'LANG_HU' | translate }}-->
            <!--</md-option>-->
          <!--</md-select>-->
        <!--</md-input-container>-->

        <md-button class="gButton block-center" style="display:block;" ng-click="reg()" ng-disabled="isRegError()">{{ 'REGISTER' | translate }}</md-button>

        <div class="form-validation-error" ng-if="isRegError()">
          <span class="reg-error-title">{{ 'REGISTER_ERROR' | translate }}: <br/></span>
          <span ng-repeat="error in getRegError()" ng-if="error.act">{{ ("NOT_VALID_" + error.text) | translate }} <br/></span>
        </div>
      </md-card-content>
    </md-card>
  </div>

</div>