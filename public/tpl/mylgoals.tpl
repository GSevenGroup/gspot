<md-content class="mygoals">
  <md-tabs md-dynamic-height md-border-bottom md-no-ink-bar md-stretch-tabs>
    <md-tab label="{{ goal.user.name }}" ng-repeat="goal in ltg">
      <md-content class="md-padding">
        <div class="goal-cont" ng-repeat="g in goal.longtermgoals">

          <div class="goal" layout="row">
            <div class="category-goal" flex="10"><span>{{ categories[g.goal.goal_id.category_id] }}</span></div>
            <div class="text" flex="80"><span>{{ g.goal.goal }}</span></div>
            <div class="options" flex="10">
              <div class="set-done-goal icons"></div>
              <div class="delete-goal icons"></div>
            </div>
          </div>
          <div layout="row" ng-repeat="comment in g.comments">
            <div flex="10"></div>
            <div class="comments" layout="row" flex="75">
              <div class="author" flex="20">
                <span>{{ getUserFromGroup(comment.user_id).name }}</span>
              </div>
              <div class="comment-text" flex="70"><span>{{ comment.message }}</span></div>
              <div class="comment-date" flex="10"><span>{{ comment.comment_date }}</span></div>
            </div>
          </div>
          <div flex="15"></div>

        </div>

        <div class="new-goal" layout="row" ng-if="(goal.user.id === user.id)">

          <md-input-container md-no-float flex="20">
            <label>{{ 'CAT_SELECT' | translate}}</label>
            <md-select ng-model="ltgModel.category_id" ng-change="validateNewGoal()">
              <md-option value="{{ cat }}" ng-model="ltgModel.category_id" ng-repeat="cat in categoriesInNumber">
                {{ 'CAT_' + cat | translate }}
              </md-option>
            </md-select>
          </md-input-container>

          <md-input-container md-no-float class="md-block" flex="70">
            <textarea ng-model="ltgModel.goal" type="text" placeholder="{{ 'GOAL_NEW' | translate }}" ng-required="false" md-maxlength="150" rows="2" ng-change="validateNewGoal()"></textarea>
          </md-input-container>

          <div class="submit" flex="10">
            <md-button ng-disabled="errorValidatingNewGoal || !ltgModel.category_id || !ltgModel.goal" ng-click="addLTG()">{{ 'ADD' | translate }}</md-button>
          </div>
        </div>

        <div class="validate-error" ng-if="errorValidatingNewGoal && (goal.user.id === user.id)">
          <span>{{ 'GOAL_ADD_ERROR' | translate }}</span>
        </div>

      </md-content>
    </md-tab>
  </md-tabs>
</md-content>