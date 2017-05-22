package com.hrmsys.dao.impl;

import java.util.List;

import com.hrmsys.dao.SearchDao;

public class SearchDaoImpl extends BaseDAO implements SearchDao {

	@Override
	public List queryByParam(String sql, Class clazz) {
		// TODO Auto-generated method stub
		return this.getBySQL(sql, clazz);
	}

}
