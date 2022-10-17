def getBoolValue(s):
    if isinstance(s, bool):
        return s

    if s.lower() == 'true':
        return True
    elif s.lower() == 'false':
        return False
    else:
        raise ValueError
