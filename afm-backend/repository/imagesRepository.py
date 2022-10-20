from app import Database


def insert_image(image_type, url, userId):
    db = Database()
    cursor = db.cursor()
    sql = "INSERT INTO AFM.Image (ImageTypeId, Url, CreatedBy) VALUES (%s, %s, %s)"
    cursor.execute(sql, (image_type, url, userId))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def getAllGalleryImages():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT I.Id, I.Url FROM AFM.Image AS I INNER JOIN AFM.ImageType AS IT ON I.ImageTypeId = IT.Id WHERE IT.Category = 'Gallery';"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def insertNewGalleryImage(url, userId):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id FROM AFM.ImageType WHERE Category = 'Gallery';"
    cursor.execute(sql)
    results = cursor.fetchall()

    imageTypeId = results[0][0]
    sql = "INSERT INTO AFM.Image(ImageTypeId, Url, CreatedBy) VALUES (%s, %s, %s)"
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


def deleteMultipleImages(imageIds):
    db = Database()
    cursor = db.cursor()

    imageIdsList = list(map(str, imageIds))

    imageIdsString = '(' + ','.join(imageIdsList) + ')'

    sql = "DELETE FROM AFM.Image WHERE Id IN " + str(imageIdsString)

    val = cursor.execute(sql)
    cursor.close()
    db.commit()
    return val >= 1
