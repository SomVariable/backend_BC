# Authorization REST API

POST /auth/sign-up

{
    email, password
}

Response:
- 201, {message: 'please verify your account' id, email}
- 400
- 500

{
    error_message: $message
}

GET /auth/sign-up/verify?${verify-key}


Response:
- 201, {access-token, refresh-token}
- 400
- 500

{
    error_message: $message
}

POST /login

{
    login,
    password
}

Response:
- 200, {message: 'please verify your account'}
- 400
- 500

{
    error_message: $message
}

GET /auth/login/verify?${verify-key}

Response:
- 201, {access-token, refresh-token}
- 400
- 500

{
    error_message: $message
}


GET /auth/refresh-token

Header:
- Authorization: $refresh-token

Response:
- 200 {access-token, refresh-token}
- 400
- 401 
- 403 
- 404
- 500

{
    error_message: $message
}

GET /auth/resend-verify-key?${email}:

Response:
- 200 {access-token, refresh-token}
- 400
- 500

{
    error_message: $message
}

# /person

Header:
- Authorization: $refresh-token

PATCH /person

{ru: {
 firstName?,
 surnameName?,
 middleName?,
 description?,
 smallDescription?,
 status?,
 position?
 }
 en: {
 firstName?,
 surnameName?,
 middleName?,
 description?,
 smallDescription?,
 status?,
 position?
 }
}
Response:
- 200 {access-token, refresh-token}
- 400
- 401 
- 403 
- 404
- 500

{
    error_message: $message
}


# /persons

Header:
- Authorization: $refresh-token

DELETE /persons/?${id}

Response:
- 200 {access-token, refresh-token}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}


PATCH /persons/?${id}/change-password

{
    password
}

Response:
- 200 { message: 'password was changed. Please, check your email'}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

# Area
Header:
- Authorization: $refresh-token

GET /area

Response:
- 200 { areas: Area[]}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

GET /area/${id}
Response:
- 200 { area: Area}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}


POST /area
{ru: {title content}, en: {title content}}
Response:
- 200 { area: Area}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

DELETE /area/${id}
Response:
- 200 { area: Area}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

PATCH /area
{lanCode, title, content}
Response:
- 200 { area: Area}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

# Practice
Header:
- Authorization: $refresh-token

- same as Area + 

GET /practice

GET /practice/${id}

POST /practice
{ru: {title content}, en: {title content}, areasIds}

DELETE /practice/${id}

PATCH /practice
{areasIds}


# Service

Header:
- Authorization: $refresh-token

- same as Area + 

GET /service

GET /service/${id}

POST /service
{ru: {title content}, en: {title content}, practiceIds}

DELETE /service/${id}

PATCH /service
{practiceIds}

# ContentItem (CASES AND PUBLICATIONS)
Header:
- Authorization: $refresh-token

GET /contentItem
GET /contentItem/cases
GET /contentItem/cases?{$caseId}
GET /contentItem/publications
GET /contentItem/publications?{$publicationId}
Response:
- 200 { contentItems: ContentItem[]} || - 200 { contentItem: ContentItem}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

POST /contentItem
{
    type: "CASE" "PUBLISH", 
    ru: {title, description,content}, 
    en: {title, description,content}, 
    personsIds,
    tags,
    photos,
}


DELETE /contentItem/${id}

PATCH /contentItem
{
    ru: {title, description,content}?, 
    en: {title, description,content}?, 
    personsIds?,
    tags?,
    photos?,
}

# Education
Header:
- Authorization: $refresh-token

GET /education
GET /education/${id}
Response:
- 200 { educations: Education[]} || - 200 { education: Education}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

POST /education
{ study_year,      
  graduation_year, 
  university,      
  specialty,       
  qualification,   
  educationLevelId, 
}
Response:
- 200  { education: Education}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

DELETE /education/${id}
Response:
- 200  { education: Education}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

PATCH /education
{ study_year,      
  graduation_year, 
  university,      
  specialty,       
  qualification,   
  educationLevelId, 
}
Response:
- 200  { education: Education}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}
# ProfessionalInterest
 Header:
- Authorization: $refresh-token

GET /professional-interest
GET /professional-interest/${id}
Response:
- 200 { professional-interests: ProfessionalInterest[]} || - 200 { professional-interests: ProfessionalInterest}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

POST /professional-interest
{ru: {title}, en: {title}, personIds}
Response:
- 200  { professional-interest: ProfessionalInterest}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

DELETE /professional-interest/${id}
Response:
- 200  { professional-interest: ProfessionalInterest}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}

PATCH /professional-interest
{langCode, title}
Response:
- 200  { professional-interest: ProfessionalInterest}
- 400
- 401 
- 403 
- 404
- 409
- 500
- 503

{
    error_message: $message
}
# Award
 - same as /professional-interest with address /award

# News
 - same as /professional-interest with address /news + 

POST /professional-interest
{ru: {text}, en: {text}, personIds}

PATCH /professional-interest
{ru: {text}?, en: {text}?, personIds}

# PartnerProfile
# PracticeManagerProfile
# EmployeeProfile
