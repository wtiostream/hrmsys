package com.hrmsys.dao;

import java.sql.Date;
import java.util.List;

import com.hrmsys.bean.PageBean;
import com.hrmsys.model.Attent;

public interface AttentDAO {
	public List<Attent> getlist(int page, int rows);
	public PageBean getlistByCondition(String time, int page, int rows, String empId);
	public<T> int findTotal(Class<T> clazz);
}
