<md-content class="mygoals">
  <md-tabs md-dynamic-height md-border-bottom>
    <md-tab label="{{ goal.user.name }}" ng-repeat="goal in stg">
      <md-content class="md-padding">

        <md-input-container>
          <label>{{ 'WEEK_SELECT' | translate}}</label>
          <md-select ng-model="actWeek" ng-change="selectNewWeek()">
            <md-option value="{{ week.id }}" ng-repeat="week in weeks" ng-selected="isSelected(week.id)">
              {{ week.date_from }} - {{ week.date_to }}
            </md-option>
          </md-select>
        </md-input-container>

        <div class="goal-cont" ng-repeat="g in goal.shorttermgoals">

          <div class="goal" layout="row">
            <div class="category-goal" flex="10"><span>{{ categories[g.goal.goal_id.category_id] }}</span></div>
            <div class="text" flex="80"><span>{{ g.goal.goal }}</span></div>
            <div class="options" flex="10">
              <div class="set-done-goal icons"></div>
              <div class="delete-goal icons"></div>
              <div class="add-comment icons" ng-click="toggleCommentAdding(g.goal.id)"></div>
            </div>
          </div>
          <div layout="row" class="add-comment" ng-show="isCommentOpen[g.goal.id]">
            <md-input-container class="md-block">
              <input ng-model="newComments[g.goal.id].message" type="text" placeholder="Add a new comment" ng-required="false">
            </md-input-container>
            <md-button ng-click="addComment(g.goal.id)">{{ 'ADD_COMMENT' | translate }}</md-button>
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
            <label>{{ 'GOAL_LSELECT' | translate}}</label>
            <md-select ng-model="stgModel.goal_id" ng-change="validateNewGoal()">
              <md-option value="{{ longtg.goal_id }}" ng-model="stgModel.goal_id" ng-repeat="longtg in getLTGPerPerson(user.id)">
                {{ longtg.goal }}
              </md-option>
            </md-select>
          </md-input-container>

          <md-input-container md-no-float class="md-block" flex="70">
            <textarea ng-model="stgModel.goal" type="text" placeholder="{{ 'GOAL_NEW' | translate }}" ng-required="false" md-maxlength="150" rows="2" ng-change="validateNewGoal()"></textarea>
          </md-input-container>

          <div class="submit" flex="10">
            <md-button ng-disabled="errorValidatingNewGoal || !stgModel.category_id || !stgModel.goal" ng-click="addSTG()">{{ 'ADD' | translate }}</md-button>
          </div>
        </div>

        <div class="validate-error" ng-if="errorValidatingNewGoal && (goal.user.id === user.id)">
          <span>{{ 'GOAL_ADD_ERROR' | translate }}</span>
        </div>

      </md-content>
    </md-tab>
  </md-tabs>
</md-content>