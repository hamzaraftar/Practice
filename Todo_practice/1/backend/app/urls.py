from django.urls import path
from .views import TodoListCreateView,TodoDetailView,TodoListCreateView ,UserDetailView , UserCreateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # for user registration 
    path('api/user/register/', UserCreateView.as_view(), name='user-register'), 
    path('api/user/details/', UserDetailView.as_view(), name='user-details'),
    
    # JWT token obtain and refresh
    path('api/user/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #for  Todos detail, update, delete
    path('todos/',TodoListCreateView.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/',TodoDetailView.as_view(), name='todo-detail'),    
]