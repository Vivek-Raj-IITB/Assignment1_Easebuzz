from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from polls import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'list',views.UserViewSet)


from . import views


app_name = "polls"
urlpatterns = router.urls
urlpatterns += [
    path("fetch_and_save/", views.fetch_and_save, name="fetch_and_save"),
    # path("", views.IndexView.as_view(), name="index"),
    path("fetch_and_display/", views.fetch_and_display, name="fetch_and_display"),
    path("delete_record/<int:bhav_code>/", views.delete_record, name="delete_record"),
    path('<int:pk>/', views.bhav_detail),
    path('', views.bhav_detail),
    path('bhav_list/', views.bhav_list),
    # path('bhav_details/<int:pk>/', views.bhav_details),
    path('bhav_add/', views.bhav_add),
    # path("delete_from_react/<int:bhav_code>/",views.delete_from_react, name="delete_from_react"),
    # path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    # path("<int:question_id>/vote/", views.vote, name="vote"),
]
urlpatterns = format_suffix_patterns(urlpatterns)
