# Goals:

### Categories:

| Name | Property Name in the Object | Description |
|:-----|-----------------------------|-------------|
| Category Name | name | one or two word description of the category |
| Category ID | id | used to identify a category by its id (safest way) |

### Short term goals:

| Name | Property Name in the Object | Description |
|:-----|-----------------------------|-------------|
| Title | title | The title of the short term goal |
| ID | id | id of the goal |
| Assigned ID | assignedId | id of the user assigned to this goal |
| Creator Id | creatorId | id of the user that created it (important for advising goals) |
| Long Term goal ID | ltgId | which long term goal is the parent? |
| Week Id | weekId | specific week id for that user's specific week |
| Leader Review | review | 0 - hasn't seen yet, 1- valid goal, 2 invalid goal |
| Status | status | done, failed , progress tracker maybe? |

### Long term goals:

| Name | Property Name in the Object | Description |
|:-----|-----------------------------|-------------|
| Title | title | The title of the long term goal |
| ID | id | id of the goal |
| Assigned ID | assignedId | id of the user assigned to this goal |
| Creator Id | creatorId | id of the user that created it (important for advising goals) |
| Category ID | categoryId | which category is the parent? |
| Year Id | yearId | specific year id for that user's specific year |
| Leader Review | review | 0 - hasn't seen yet, 1- valid goal, 2 invalid goal |
| Status | status | done, failed , milestone |

# People

## User
| Name | Property Name in the Object | Description |
|:-----|-----------------------------|-------------|
| UserName | username | the username of the user |
| Emails | emails | email address of the user, an array |
| Password | password | should never be available to frontend |
| First Name | fname | first name of the user |
| Last Name | lname | Last Name / last names of the user |
| Avatar | avatar | The profile picture of the user |
| Group Id | groupId | Group id where the user is a member |
| Landing Page | landingPage | should contain a url within the site where he/she can be redirected after login |
| User Level | level | The level where the user is |
| User Type  | type | This is for differentiating the prganization and personal members |
| Leader ID | leaderId | This should only have value if user is a leader |
| Employee ID | employeeId | This should only have value if the user is the emplyee of the company |
| Language | lang | the preferred language of the user |

| Levels: | Description |
| :---:   | ----------- |
| 0 | User is a free account |
| 1 | User has payed already,Basic user account |

## Employee

