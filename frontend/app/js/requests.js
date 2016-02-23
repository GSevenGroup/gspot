var api = "http://localhost:8080";

var requests = {
  "login": {},

  "register":{
    "route": api + "/createuser"
  },

  "list_longgoals":{
    "route": api + "/api/longgoals"
  },
  "list_week":{
    "route": api + "/api/weeks"
  },
  "list_shortgoals":{
    "route": api + "/api/shortgoals"
  },
  "list_groups":{
    "route": api + "/api/groups"
  },

  "create_longgoal":{
    "route": api + "/api/createlonggoal"
  },
  "create_shortgoal":{
    "route": api + "/api/createshortgoal"
  },
  "create_week":{
    "route": api + "/api/addweek"
  },
  "create_ltg_comment":{
    "route": api + "/api/addlonggoalcomment"
  },
  "create_stg_comment":{
    "route": api + "/api/addshortgoalcomment"
  },
  "create_group":{
    "route": api + "/api/addgroup"
  },

  "update_user":{
    "route": api + "/api/edituser"
  },
  "update_group":{
    "route": api + "/api/editgroup"
  },
  "update_shortgoal":{
    "route": api + "/api/editshortgoal"
  },
  "update_longgoal":{
    "route": api + "/api/editlonggoal"
  },

  "user":{
    route: api + "/api/user"
  }

};
