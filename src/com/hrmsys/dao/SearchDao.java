package com.hrmsys.dao;

import java.util.List;

public interface SearchDao {
	public List queryByParam(String sql, Class clazz);
}
