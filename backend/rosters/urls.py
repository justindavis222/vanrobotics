from django.urls import path
from rosters import views


urlpatterns = [
    path('learners', views.LearnerList.as_view(), name='LearnerList'),
    path('classbatches', views.ClassBatchList.as_view(), name='ClassBatchList'),
    path('learner/<int:pk>/', views.LearnerDetailView.as_view(), name='LearnerDetailView'),
    path('classbatch/<int:pk>/', views.ClassBatchDetailView.as_view(), name='ClassBatchDetailView'),
]
