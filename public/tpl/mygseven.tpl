<div id="members-area">
  <ng-include src="'./tpl/header_main.tpl'"></ng-include>

  <div id="body" layout="row">

    <div class="navbar-left" flex="15">
      <md-sidenav class="md-sidenav-left" md-component-id="left" md-is-locked-open="true">
        <md-toolbar class="">
          <h1 class="md-toolbar-tools">{{ 'MENU' | translate }}</h1>
        </md-toolbar>
        <md-content>
          <ul class="navbar-menu">
            <!--<li class="big-menu-cont" layout="row">-->
              <!--<div class="user-avatar" flex="40"></div>-->
              <!--<div class="text" flex="60">-->
                <!--<div class="name">-->
                  <!--<span>{{ user.fullName }}</span>-->
                <!--</div>-->
                <!--<div class="menus" layout="row">-->
                  <!--<div class="mini-menu" flex="50">-->
                    <!--<span>{{ 'MENU_SETTINGS' | translate}}</span>-->
                  <!--</div>-->
                  <!--<div class="mini-menu" flex="50">-->
                    <!--<span>{{ 'MENU_MYPROFILE' | translate}}</span>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</li>-->
            <li class="menuitems" ui-sref=".mygoals" ui-sref-active="active">{{ 'MENU_MYGOALS' | translate }}</li>
            <li class="menuitems" ui-sref=".mymeetings" ui-sref-active="active">{{ 'MENU_MYMEETINGS' | translate }}</li>
            <li class="menuitems" ui-sref=".mygroup" ui-sref-active="active">{{ 'MENU_MYGROUP' | translate }}</li>
          </ul>
        </md-content>
      </md-sidenav>
    </div>

    <div id="middle-section" flex="85">
      <div ui-view></div>
    </div>

  </div>

</div>