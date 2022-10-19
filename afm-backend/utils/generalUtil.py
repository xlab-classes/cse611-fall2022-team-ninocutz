def getBoolValue(s):
    if not s or s == 'undefined':
        return False

    if isinstance(s, bool):
        return s

    if s.lower() == 'true':
        return True
    elif s.lower() == 'false':
        return False
    else:
        raise ValueError
