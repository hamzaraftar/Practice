
from django.contrib import admin
from django.urls import path
from app.views import UserCreate, UserInfo, TodoCreateList, TodoUpdateDelete
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/todos/', TodoCreateList.as_view(), name='todo_create_list'),
    path('api/todos/<int:pk>/', TodoUpdateDelete.as_view(), name='todo_update_delete'),

    path('api/user/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/user/register/', UserCreate.as_view(), name='user_create'),
    path('api/user/details/', UserInfo.as_view(), name='user_info'),    
]
