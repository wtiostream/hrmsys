package com.hrmsys.service;

import java.sql.Date;

public interface AttentService {
	public String getlist(String page, String rows);
	public String getlistByCondition(String time, String page, String rows, String empId);
}
