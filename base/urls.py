from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name="home"),
    path('login/', views.loginUser, name="login"),
    path('register/', views.registerUser, name="register"),
    path('profile/', views.userProfile, name="profile"),
    path('logout/', views.logoutUser, name='logout'),

]