package com.hrmsys.util;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.print.attribute.standard.DateTimeAtCompleted;

public class CurrentDate {
	/**
	 * 返回字符串形式的日期
	 * @return
	 */
	public static String getStringDate(){
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
	}
	/**
	 * 返回日期的字符串格式
	 * @param date
	 * @return string
	 */
	public static String getStringDate(Date date){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
	}
	/**
	 * 返回日期类型的日期
	 * @return Date类型
	 */
	public static Date getDate(){
		Date date = new Date();
		Date newDate = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			 newDate = sdf.parse(sdf.format(date));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return newDate;
	}
	/**
	 * 返回日期类型的日期和时间
	 * @return Date类型
	 */
	public static Date getDateAndTime(){
		Date date = new Date();
		Date newDate = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			 newDate = sdf.parse(sdf.format(date));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return newDate;
	}
	/**
	 * 返回日期类型的日期和时间
	 * @return Date类型
	 */
	public static String getStringDateAndTime(){
		Date date = new Date();
		String newDate = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		newDate = sdf.format(date);
		return newDate;
	}
	
	public static String getDateWeek(){
		String[] week = new String[]{"日","一","二","三","四","五","六"};
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
		Date date = new Date();
		String dateString = sdf.format(date);
		Calendar calendar = Calendar.getInstance();
		int weekDay = calendar.get(Calendar.DAY_OF_WEEK);
		System.out.println(weekDay);
		return dateString+" 星期"+week[weekDay-1];
	}
	
	public static int daysBetween(Date date1,Date date2)  
    {  
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date1);  
        long time1 = cal.getTimeInMillis();               
        cal.setTime(date2);  
        long time2 = cal.getTimeInMillis();       
        long between_days=(time2-time1)/(1000*3600*24);  
          
       return Integer.parseInt(String.valueOf(between_days));         
    }  
	public static void main(String[] args) throws Exception{
		System.out.println(CurrentDate.getStringDateAndTime());
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");  
        Date d1=sdf.parse("2012-09-15");  
        Date d2=sdf.parse("2012-09-11");  
		System.out.println(CurrentDate.daysBetween(d2, d1));
	}
}
	
