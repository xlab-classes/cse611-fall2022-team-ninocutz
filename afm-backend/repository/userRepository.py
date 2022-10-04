from app import Database

def login(username, password):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT * FROM RV_User WHERE EmailID = %s AND Password = %s"
    cursor.execute(sql, (username, password))
    res = cursor.fetchall()
    cursor.close()
    return res

def check_user_exists(username):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT * from RV_User where EmailId = %s"
    cursor.execute(sql, (username))
    res = cursor.fetchall()
    cursor.close()
    return res

def reset_password(username, password):
    db = Database()
    cursor = db.cursor()
    sql = "update RV_User set Password = %s where EmailID = %s"
    cursor.execute(sql, (password, username))
    cursor.close()
    db.commit()
    

    
    