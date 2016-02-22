# Routes
##Lists

| Name | URL | Method | Comment|Data|Permissions (empty=everybody)|
|---|---|---|---|---|---|
| mainpage | api/mainpage | GET |it gives the mainpage|||
| list groups |api/groups | GET | it gives back all the groups||admin,mentor|
| list weeks | api/weeks | POST |it gives back the weeks for a group|"group_id": 1|user,admin,mentor|
| list long term goals | api/longgoals | POST |it gives back the long term gaols and the comments  of a group|"group_id": 1|user,admin,mentor|
| list short term goals | api/shortgoals| POST |it gives back the short term gaols and the comments  of a group|"group_id": 1|user,admin,mentor|
| get user| api/user| GET |it gives back the user||user,admin,mentor|



##Creates

###User:
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---|
| create user | /createuser | POST |||| 
```php
{
		"name" => "valami",
		"email" => "ccc@aaa.hu",
        "password" => "pass",
        "user_group" => 1,
        "level" => 0,
        "country" => "vmi",
        "city" => "requaaa",
        "address" => "aaaa",
        "phone" => "111111"
}
```

###Long Goal:
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---|
| create long term goal | api/createlonggoal | POST || user,admin,mentor|
```php
{
          "goal": "ccccccccccccccccccccccccccccccccc",
          "sketch": 0,   <--   1 ->true , 0 -> false
          "assigned_id": 2,   <-- userid
          "suggest_id": 2, 
          "category_id": 2,  
          "goal_date": "2015–05–12 21:00:00"  // the date when the user set the goal after sketch it should be changed, we should figure out the dateformat
        }
```
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---|
| create comment | api/addlonggoalcomment | POST | the comment type means that is it a mentor comment or a normal| user,admin,mentor|
```php	
{
            'message' => 'aaaaaaaaaa',
            'comment_type' => 0,
            'goal_id' => 2
        }
```
###Short Goal:
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---|
| create shorttermgoal | api/createshortgoal | POST |the goal_id is the id of the longterm goal|user,admin,mentor|
```php
{
          "goal": "ccccccccccccccccccccccccccccccccc",
          "sketch": 0,   //   1 ->true , 0 -> false
          "assigned_id": 2,   // userid
          "suggest_id": 2, 
          "week_id": 2,  
          "goal_id": 1   // the id of the longtermgoal
        }
		
```
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---| 
| create comment | api/addshortgoalcomment | POST | the comment type means that is it a mentor comment or a normal| user,admin,mentor|
```php
{
            'message' => 'aaaaaaaaaa',
            'comment_type' => 0,
            'goal_id' => 2
        }
```
###Group:
| Name | URL | Method | Comment|Permission|
|---|---|---|---|---|
| create group | api/addgroup | POST ||admin|
```php		
{
             "name": "the group",
            "mentor": 1
        }
```
###Week:
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---| 
| create group | api/addweek | POST ||user,admin,mentor| 
```php	
{
	"week_num":2
	"date_from": "2015–05–12 21:00:00"
	"date_to": "2015–05–12 21:00:00"
	"group_id": 1
        }		
```


##Updates


###User:
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---|
| update user | api/edituser | POST |you can send anything I mean just name or name and password or all doesnt matter|user,admin,mentor|
```php	
{
		"name" => "valami",
		"email" => "ccc@aaa.hu",
        "password" => "pass",
        "user_group" => 1,
        "level" => 0,
        "country" => "vmi",
        "city" => "requaaa",
        "address" => "aaaa",
        "phone" => "111111"
}
```	

| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---|
| append group to user| api/editusergroup | POST | |admin|
```php
{
        'id' => 1,
        'user_group' => 1
}
```	
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---|
| change user level | api/edituserlevel | POST |if a user paying he is in level 1 or above else 0 |admin|
```php	
{
            'id' => 1,
            'level' => 0
}
```	

###Long goal:
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---|
|edit long term goal | api/editlonggoal | POST |id <- goal id   and the assigned_id  are required the rest are optional|user,admin,mentor|

```php
{
		"id": 2,
          "goal": "ccccccccccccccccccccccccccccccccc",
          "sketch": 0, // 0 false 1 true
          "assigned_id": 2,   // userid
          "suggest_id": 2, 
          "category_id": 2,  
          "goal_date": "2015–05–12 21:00:00"  // the date when the user set the goal after sketch the goal should be changed, we should figure out the dateformat
        }
```
###Short Goal:
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---|
|edit short term goal | api/editshortgoal | POST |id <- goal id   and the assigned_id  are required the rest are optional|user,admin,mentor|
```php	
{
		"id": 2,
          "goal": "ccccccccccccccccccccccccccccccccc",
          "sketch": 0,   //1 true , 0 false
          "assigned_id": 2,   // userid
          "suggest_id": 2, 
          "week_id": 2,  
          "goal_id": 1   // the id of the longtermgoal
}
```

###Group:
| Name | URL | Method | Comment|Permissions|
|---|---|---|---|---|
|edit groups | api/editgroup | POST | edit a group	id <- group id  required |admin,mentor|
```			
{
	"id":1,
        "name": "the group",
        "mentor": 1
}
```	
