<md-content class="mygoals">
  <md-tabs md-dynamic-height md-border-bottom>
    <md-tab label="Henrik">
      <md-content class="md-padding">
        <div class="goal-cont">

          <div class="goal" layout="row">
            <div class="category-goal" flex="10"><span>H</span></div>
            <div class="text" flex="80"><span>Here is a new goal of mine for this week.</span></div>
            <div class="options" flex="10">
              <div class="set-done-goal icons"></div>
              <div class="delete-goal icons"></div>
            </div>
          </div>
          <div layout="row">
            <div flex="10"></div>
            <div class="comments" layout="row" flex="75">
              <div class="author" flex="20">
                <span>Henrikecske Lassuka:</span>
              </div>
              <div class="comment-text" flex="70"><span>This is a shitty goal. It's valid tho'.</span></div>
              <div class="comment-date" flex="10"><span>02.15.</span></div>
            </div>
          </div>
          <div flex="15"></div>

        </div>

        <div class="new-goal" layout="row">

          <md-input-container md-no-float flex="20">
            <label>{{ 'LANG_SELECT' | translate}}</label>
            <md-select ng-model="registerModel.lang">
              <md-option value="en">
                {{ 'CAT_HEALTH' | translate }}
              </md-option>
              <md-option value="hu">
                {{ 'CAT_MONEY' | translate }}
              </md-option>
            </md-select>
          </md-input-container>

          <md-input-container md-no-float class="md-block" flex="70">
            <textarea ng-model="newgoal.text" type="text" placeholder="{{ 'GOAL_NEWGOAL' | translate }}" ng-required="false" md-maxlength="150" rows="3"></textarea>
          </md-input-container>

          <div class="submit" flex="10">
            <button>Go</button>
          </div>
        </div>

      </md-content>
    </md-tab>
  </md-tabs>
</md-content>