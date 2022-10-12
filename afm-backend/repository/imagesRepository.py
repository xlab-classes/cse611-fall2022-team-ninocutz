from app import Database


def insert_image(image_type, url, userId):
    db = Database()
    cursor = db.cursor()
    sql = "INSERT INTO Image(image_type, url, CreatedBy) VALUES (%s, %s, %s)"
    cursor.execute(sql, (image_type, url, userId))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def getAllGalleryImages():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT I.Id, I.Url FROM AFM.Image AS I INNER JOIN Image_type AS IT ON I.Image_type = IT.Id WHERE IT.Category = 'Gallery';"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def insertNewGalleryImage(url, userId):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id FROM AFM.Image_type WHERE Category = 'Gallery';"
    cursor.execute(sql)
    results = cursor.fetchall()

    imageTypeId = results[0][0]
    sql = "INSERT INTO Image(image_type, url, CreatedBy) VALUES (%s, %s, %s)"
    cursor.execute(sql, (imageTypeId, url, userId))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def deleteImage(imageId):
    db = Database()
    cursor = db.cursor()
    sql = "DELETE FROM AFM.Image WHERE Id = %s"
    val = cursor.execute(sql, (imageId))
    cursor.close()
    db.commit()
    return val == 1
