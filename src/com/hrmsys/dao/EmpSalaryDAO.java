package com.hrmsys.dao;

import java.util.List;

import com.hrmsys.bean.PageBean;
import com.hrmsys.model.EmpSalary;

public interface EmpSalaryDAO {
	/**
	 * 查询所有员工薪资信息
	 */
	List<EmpSalary> findAll(int start, int limit);
	/**
	 * 一键搜
	 */
	PageBean findByCondition(String condition, int start, int limit);
	/**
	 * 保存
	 */
	boolean save(EmpSalary empSal);
}
