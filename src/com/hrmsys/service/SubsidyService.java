package com.hrmsys.service;

import java.util.List;

import com.hrmsys.model.EmpSubsidy;

public interface SubsidyService {
	/**
	 * select all
	 */
	public String getAll(String page, String rows);
	/**
	 * save a entity
	 */
	public String save(EmpSubsidy sub);
	/**
	 * delete some entity
	 */
	public String delete(String ids);
	/**
	 * one key search
	 */
	public String getInfoByCondition(String condition, String page, String rows);
	/**
	 * select by EmpId
	 */
	public String listById(String empId);
	/**
	 * 
	 */
	public List<EmpSubsidy> getAll();
	
}
