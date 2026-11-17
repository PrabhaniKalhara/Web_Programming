from django.urls import path

from . import views

app_name = "myApp"

urlpatterns = [
    path("", views.home, name="home"),
    path("studentlist/<int:page>/", views.studentlist, name="studentlist"),
    path("modulelist/", views.modulelist, name="modulelist"),
    path("<int:student_id>/", views.student_detail, name="student_detail"),
]
