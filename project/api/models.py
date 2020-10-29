from . import db

class User(db.Model):
	__tablename__ = 'User'
	id=db.Column(db.Integer)
	user=db.Column(db.String(50),primary_key=True)
	password=db.Column(db.String(50))
	mode=db.Column(db.String(50))
	phone=db.Column(db.Integer)
	mail=db.Column(db.Integer)
	crop=db.relationship('Farmer',backref='User')

class Farmer(db.Model):
	__tablename__ = 'Farmer'
	id=db.Column(db.Integer,primary_key=True)
	cname=db.Column(db.String(50))
	cost=db.Column(db.Integer)
	quantity=db.Column(db.Integer)
	farm=db.Column(db.String(50),db.ForeignKey('User.user'))

class Orders(db.Model):
	__tablename__='Orders'
	id=db.Column(db.Integer,primary_key=True)
	cus_name=db.Column(db.String(50))
	cname=db.Column(db.String(50))
	fname=db.Column(db.String(50))
	c_id=db.Column(db.Integer)
	quantity=db.Column(db.Integer)
	cost=db.Column(db.Integer)

