from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('create/', views.post_create, name='post_create'),
    path('edit/<int:id>/', views.post_edit, name='post_edit'),
    path('api/posts/', views.post_api, name='post_api'),
]