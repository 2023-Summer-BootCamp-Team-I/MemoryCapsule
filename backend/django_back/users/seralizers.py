from django import forms
from .models import User
class UserForm(forms.Form):
    id = forms.CharField(required=True)
    password = forms.CharField(required=True)
    password_check = forms.CharField(required=True)
    phone_number = forms.CharField(required=True)
    nickname = forms.CharField(required=True)
    email = forms.EmailField(required=True)
    file = forms.ImageField(required=True)

    def clean(self):
        cleaned_data = super().clean()

        id = cleaned_data.get('id')
        email = cleaned_data.get('email')
        phone_number = cleaned_data.get('phone_number')
        nickname = cleaned_data.get('nickname')

        if User.objects.filter(username=id).exists():
            self.add_error('id', 'This id is already taken')

        if User.objects.filter(email=email).exists():
            self.add_error('email', 'This email is already taken')

        if User.objects.filter(phone_number=phone_number).exists():
            self.add_error('phone_number', 'This phone number is already taken')

        if User.objects.filter(nickname=nickname).exists():
            self.add_error('nickname', 'This nickname is already taken')